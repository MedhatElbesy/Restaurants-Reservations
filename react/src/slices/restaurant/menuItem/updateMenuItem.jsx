import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateMenuItem } from '../../../api/restaurant/updateAtRestaurant';


export const updateMenuItemThunk = createAsyncThunk(
  'menuItem/updateMenuItem',
  async ({ menuItemId, data }) => {
    const response = await updateMenuItem(menuItemId, data);
      return response;
  }    
);

const updateMenuItemSlice = createSlice({
  name: 'updateMenuItem',
  initialState: {
    menuItem: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMenuItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMenuItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuItem = action.payload;
        state.error = null;
      })
      .addCase(updateMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default updateMenuItemSlice.reducer;
