import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateRestaurantCategory } from '../../api/restaurant/updateAtRestaurant';
import {  categoryById } from '../../api/restaurant/restaurantFetch';


export const fetchCategoryByIdAsync = createAsyncThunk(
  'category/fetchCategoryById',
  async (categoryId) => {
    try {
      const data = await categoryById(categoryId);
      return data; 
    } 
    catch (error) {
        throw error;
    }

  }
);

export const updateCategoryAsync = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, formData }) => {
    try {
      const data = await updateRestaurantCategory(categoryId, formData);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload; 
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
     
  },
});

export default categorySlice.reducer;
