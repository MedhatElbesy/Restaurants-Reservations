import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeReservation } from "../../api/checkout/checkout";

export const reserveTable = createAsyncThunk(
  "reservations/makeReservation",
  async (reservationData, { rejectWithValue }) => {
    try {
      const data = await makeReservation(reservationData);
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

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeReservation.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
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

export default availabilitySlice.reducer;
