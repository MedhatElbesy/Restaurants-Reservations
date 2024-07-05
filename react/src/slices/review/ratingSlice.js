import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAvgRating, addUserRating } from "../../api/restaurant/review/rating";

export const getBranchAvgRating = createAsyncThunk(
  "rating/getBranchAvgRating",
  async (branchId, { rejectWithValue }) => {
    try {
      const data = await getAvgRating(branchId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addRating = createAsyncThunk(
  "rating/addRating",
  async ({ rate, branchId }, { rejectWithValue }) => {
    
    try {
      const response = await addUserRating(rate, branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    branchAvgRating: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranchAvgRating.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branchAvgRating = action.payload.data;
      })
      .addCase(addRating.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
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

export default ratingSlice.reducer;
