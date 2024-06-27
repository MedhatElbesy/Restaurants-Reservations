import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateLocation } from '../../../api/restaurant/updateAtRestaurant';
import { locationById} from '../../../api/restaurant/restaurantFetch';
import {  addLocation } from '../../../api/restaurant/addRestaurant';


export const fetchLocationByIdAsync = createAsyncThunk(
  'location/fetchLocationById',
  async (locationId) => {
    const response = await locationById(locationId);
    return response.data;
  }
);


export const updateLocationAsync = createAsyncThunk(
  'location/updateLocation',
  async ({ locationId, data }) => {
    const updatedData = await updateLocation(locationId, data);
    return updatedData;
  }
);


export const addLocationAsync = createAsyncThunk(
  'location/addLocation',
  async (locationData) => {
    const addedLocation = await addLocation(locationData);
    return addedLocation;
  }
);


const locationSlice = createSlice({
  name: 'location',
  initialState: {
    location: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      })
      .addCase(fetchLocationByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLocationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      })
      .addCase(updateLocationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update location';
      })
      .addCase(addLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addLocationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.location = action.payload;
      })
      .addCase(addLocationAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add location';
      });
  },
});

export default locationSlice.reducer;
