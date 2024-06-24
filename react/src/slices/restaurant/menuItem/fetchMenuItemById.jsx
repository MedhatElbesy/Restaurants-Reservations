import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { menuItemById } from '../../../api/restaurant/restaurantFetch'; 


export const fetchMenuItemById = createAsyncThunk(
  'menuItem/fetchMenuItemById',
  async (menuItemId) => {
   const response = await menuItemById(menuItemId);
      return response.data;
  }
);


const menuItemSlice = createSlice({
  name: 'menuItem',
  initialState: {
    menuItem: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuItem = action.payload;
        state.error = null;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default menuItemSlice.reducer;
