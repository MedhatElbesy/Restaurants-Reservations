import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios";

export const updateRestaurantAsync = createAsyncThunk(
  "restaurant/updateRestaurant",
  async (restaurantId, formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/restaurants/${restaurantId}?_method=PATCH`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
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
  "restaurant/fetchRestaurantById",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/restaurants/${restaurantId}`);
      return response.data;
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
  name: 'restaurant',
  initialState: {
    restaurant: null,
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.restaurant = action.payload.data;
        console.log(state.restaurant)
      })
      .addCase(updateRestaurantAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurant = action.payload.data;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.loading = true;
          state.error = null;
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