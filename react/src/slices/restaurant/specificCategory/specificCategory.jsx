import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  specificCategory } from '../../../api/restaurant/restaurantFetch';
import { deleteSpecificCategory} from '../../../api/restaurant/delete';


export const fetchSpecificCategoryAsync = createAsyncThunk(
  'specificCategory/fetchCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await specificCategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await deleteSpecificCategory(categoryId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecificCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchSpecificCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = state.category.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
