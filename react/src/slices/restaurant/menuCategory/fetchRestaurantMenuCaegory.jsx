import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchRestaurantMenuCategory } from '../../../api/restaurant/restaurantFetch';
import { updateMenuCategory } from '../../../api/restaurant/updateAtRestaurant';



export const fetchRestaurantMenuCategories = createAsyncThunk(
  'restaurantMenuCategories/fetchRestaurantMenuCategories',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await FetchRestaurantMenuCategory(restaurantId);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }
);


export const updateMenuCategoryThunk = createAsyncThunk(
  'restaurantMenuCategories/updateMenuCategory',
  async ({ menuCategoryId, data }, { rejectWithValue }) => {
    try {
      const response = await updateMenuCategory(menuCategoryId, data);
      return { menuCategoryId, updatedData: response.data }; 
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        data: error.response?.data,
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
      })
      .addCase(updateMenuCategoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedData = action.payload;
        if (state.allMenuCategory) {
          state.allMenuCategory = state.allMenuCategory.map(category =>
            category.id === updatedData.id ? updatedData : category
          );
        }
        state.error = null;
      })
      .addCase(updateMenuCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default AllMenuCategorySlice.reducer;
