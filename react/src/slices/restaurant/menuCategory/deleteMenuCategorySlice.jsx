import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMenuCategory } from '../../../api/restaurant/delete';


export const deleteMenuCategoryThunk = createAsyncThunk(
  'menuCategory/deleteMenuCategory',
  async (menuCategoryId) => {
    const response = await deleteMenuCategory(menuCategoryId);
    return response;
  }
);

const deleteMenuCategorySlice = createSlice({
  name: 'deleteMenuCategory',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteMenuCategoryThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMenuCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default deleteMenuCategorySlice.reducer;
