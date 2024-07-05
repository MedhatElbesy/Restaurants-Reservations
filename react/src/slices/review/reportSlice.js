import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUserReport,
} from "../../api/restaurant/review/report";

export const addReport = createAsyncThunk(
  "reports/addReport",
  async ({ report, branchId }, { rejectWithValue }) => {
    try {
      const response = await addUserReport(report, branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReport.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default reportSlice.reducer;
