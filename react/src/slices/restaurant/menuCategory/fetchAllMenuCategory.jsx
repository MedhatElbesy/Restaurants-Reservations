import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { menuCategory } from '../../../api/restaurant/restaurantFetch'; 

export const fetchAllMenuCategories = createAsyncThunk(
  'allMenuCategory/fetchAllMenuCategories',
  async () => {
    const data = await menuCategory();
    return data;
  }
);


const AllMenuCategorySlice = createSlice({
  name: 'allMenuCategory',
  initialState: {
    allMenuCategory: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMenuCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMenuCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allMenuCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchAllMenuCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default AllMenuCategorySlice.reducer;
