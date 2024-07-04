import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteMenuItem } from '../../../api/restaurant/delete';

export const deleteMenuItemThunk = createAsyncThunk(
  'menuItem/deleteMenuItem',
  async (menuItemId) => {
    const response = await deleteMenuItem(menuItemId);
    return response;
  }
);

const deleteMenuItemSlice = createSlice({
  name: 'deleteMenuItem',
  initialState: {
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteMenuItemThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(deleteMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default deleteMenuItemSlice.reducer;
