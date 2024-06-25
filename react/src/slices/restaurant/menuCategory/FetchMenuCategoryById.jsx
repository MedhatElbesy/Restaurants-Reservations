import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { menuCategoryById } from '../../../api/restaurant/restaurantFetch'; 


export const fetchMenuCategoryById = createAsyncThunk(
  'menuCategory/fetchMenuCategoryById',
  async (menuCategoryId) => {
    const data = await menuCategoryById(menuCategoryId);
    return data;
  }
);


const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState: {
    menuCategory: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuCategory = action.payload;
        state.error = null;
      })
      .addCase(fetchMenuCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuCategorySlice.reducer;
