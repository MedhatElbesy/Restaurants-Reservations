import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRestaurantByCategory } from '../api/restaurant/restaurantFetch';


export const fetchRestaurantByCategoryAsync = createAsyncThunk(
  'restaurantsCategoryData/fetchByCategory',
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await fetchRestaurantByCategory(categoryName);
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

const restaurantsCategoryDataSlice = createSlice({
  name: 'restaurantsCategoryData',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantByCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantByCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRestaurantByCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantsCategoryDataSlice.reducer;
