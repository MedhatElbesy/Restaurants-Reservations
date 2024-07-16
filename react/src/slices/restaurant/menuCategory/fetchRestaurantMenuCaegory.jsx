import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchRestaurantMenuCategory } from '../../../api/restaurant/restaurantFetch';



export const fetchRestaurantMenuCategories = createAsyncThunk(
  'restaurantMenuCategories/fetchRestaurantMenuCategories',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await FetchRestaurantMenuCategory(restaurantId);
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


const AllMenuCategorySlice = createSlice({
  name: 'restaurantMenuCategories',
  initialState: {
    allMenuCategory: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantMenuCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurantMenuCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allMenuCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchRestaurantMenuCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default AllMenuCategorySlice.reducer;
