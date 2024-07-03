import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGateways } from "../../api/checkout/gateway";

export const getGateways = createAsyncThunk(
  "gateways/getGateways",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllGateways();
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

const gatewaysSlice = createSlice({
  name: "gateways",
  initialState: {
    status: "idle",
    gateways: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGateways.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.gateways = action.payload.data;
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

export default gatewaysSlice.reducer;
