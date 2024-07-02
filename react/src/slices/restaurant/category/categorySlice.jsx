import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateRestaurantCategory } from '../../../api/restaurant/updateAtRestaurant';
import { categoryById, specificCategory} from '../../../api/restaurant/restaurantFetch';
import { addCategory } from '../../../api/restaurant/addRestaurant';
import {  deleteSpecificCategory } from '../../../api/restaurant/delete';

export const fetchCategoryByIdAsync = createAsyncThunk(
  'category/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await categoryById(categoryId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

export const updateCategoryAsync = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, formData }, { rejectWithValue }) => {
    try {
      const data = await updateRestaurantCategory(categoryId, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  'category/addCategory',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addCategory(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await deleteSpecificCategory(categoryId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchSpecificCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = null; 
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
