import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeCheckout } from "../../api/checkout/checkout";

export const checkoutReservation = createAsyncThunk(
  "checkout/checkoutResevation",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const data = await makeCheckout(checkoutData);
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

const checkoutSlice = createSlice({
  name: "reservations",
  initialState: {
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutReservation.fulfilled, (state) => {
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

export default checkoutSlice.reducer;
