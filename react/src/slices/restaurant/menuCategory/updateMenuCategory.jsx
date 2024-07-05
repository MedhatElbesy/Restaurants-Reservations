import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateMenuCategory } from '../../../api/restaurant/updateAtRestaurant';


export const updateMenuCategoryThunk = createAsyncThunk(
  'menuCategory/updateMenuCategory',
  async ({ menuCategoryId, data }) => {
   
      const response = await updateMenuCategory(menuCategoryId, data);
      return response.data;
   
  }
);

const menuCategoryUpdateSlice = createSlice({
  name: 'menuCategoryUpdate',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMenuCategoryThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateMenuCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuCategoryUpdateSlice.reducer;
