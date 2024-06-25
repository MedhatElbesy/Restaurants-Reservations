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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteMenuItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMenuItemThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default deleteMenuItemSlice.reducer;
