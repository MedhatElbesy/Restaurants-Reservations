import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  makeCheckout,
  getAllReservations,
  updateUserReservationStatus,
} from "../../api/checkout/checkout";

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

export const getAllRestaurantReservations = createAsyncThunk(
  "checkout/getAllRestaurantReservations",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await getAllReservations(restaurantId);
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

export const updateReservationStatus = createAsyncThunk(
  "checkout/updateReservationStatus",
  async ({ reservationId, status }, { rejectWithValue }) => {
    console.log(reservationId, status);
    try {
      const data = await updateUserReservationStatus(reservationId, status);
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
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestaurantReservations.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.reservations = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.status = "succeeded";
      })
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
