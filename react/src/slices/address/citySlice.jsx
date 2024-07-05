import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { city } from '../../api/address/fetchCity';

export const fetchCitiesAsync = createAsyncThunk(
  'city/fetchCities',
  async (governorateId) => {
    return await city(governorateId);
  }
);

const citySlice = createSlice({
  name: 'city',
  initialState: {
    cities: [],
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitiesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCitiesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCities = (state) => state.city.cities.data;

export default citySlice.reducer;
