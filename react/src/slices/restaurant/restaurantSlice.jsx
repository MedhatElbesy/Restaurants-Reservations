import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateRestaurant } from "../../api/restaurant/updateAtRestaurant";
import { getRestaurantById } from "../../api/restaurant/restaurantFetch";
import { addRestaurant } from "../../api/restaurant/addRestaurant"; 
import { deleteRestaurant } from "../../api/restaurant/delete"; 


export const updateRestaurantAsync = createAsyncThunk(
  "restaurant/updateRestaurant",
  async ({ restaurantId, formData }, { rejectWithValue }) => {
    try {
      const data = await updateRestaurant(restaurantId, formData);
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

export const addRestaurantAsync = createAsyncThunk(
  "restaurant/addRestaurant",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addRestaurant(formData);
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
    restaurant: null,
    restaurants: [],
    menuCategories: null,
    locations: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.restaurant = action.payload.data;
        state.menuCategories = state.restaurant.menu_categories;
        state.locations = state.restaurant.locations;
      })
      .addCase(updateRestaurantAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurant = action.payload.data;
      })
      .addCase(addRestaurantAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurant = action.payload.data;
      })
      .addCase(deleteRestaurantAsync.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        );
        state.status = "succeeded";
        state.restaurant = null; 
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

export default restaurantSlice.reducer;
