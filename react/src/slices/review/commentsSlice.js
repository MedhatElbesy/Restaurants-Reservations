import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsByRestaurantId,
  addCommentToRestaurant,
} from "../../api/restaurant/review/comments";

export const getRestaurantComments = createAsyncThunk(
  "comments/getRestaurantComments",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await getCommentsByRestaurantId(restaurantId);
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

export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchById",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await getRestaurantById(restaurantId);
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

export const addComment = createAsyncThunk(
  "restaurant/addComment",
  async ({comment, restaurantId}, { rejectWithValue }) => {
    try {
      const data = await addCommentToRestaurant(comment, restaurantId);
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

export const deleteRestaurantAsync = createAsyncThunk(
  "restaurant/deleteRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const data = await deleteRestaurant(restaurantId);
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

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantComments: [],
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantComments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.restaurantComments = action.payload.data;
      })
      // .addCase(updateRestaurantAsync.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.restaurant = action.payload.data;
      // })
      // .addCase(addRestaurantAsync.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.restaurant = action.payload.data;
      // })
      // .addCase(deleteRestaurantAsync.fulfilled, (state) => {
      //   state.restaurants = state.restaurants.filter(
      //     (restaurant) => restaurant.id !== action.payload
      //   );
      //   state.status = "succeeded";
      //   state.restaurant = null;
      // })
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

export default restaurantSlice.reducer;
