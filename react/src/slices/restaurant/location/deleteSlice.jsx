import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteRestaurantLocation } from '../../../api/restaurant/delete';

export const deleteLocationAsync = createAsyncThunk(
  'deleteLocation/deleteRestaurantLocation',
  async (locationId) => {
    const response = await deleteRestaurantLocation(locationId);
    return response.data; 
  }
);

const deleteLocationSlice = createSlice({
  name: 'deleteLocation',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteLocationAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteLocationAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteLocationAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const selectDeleteStatus = (state) => state.deleteLocation.status; 

export default deleteLocationSlice.reducer;
