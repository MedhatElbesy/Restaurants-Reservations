import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { country } from '../../api/address/fetchCountry'; 


export const fetchCountriesAsync = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    try {
      const countries = await country();
      return countries;
    } catch (error) {
      console.error('An error occurred during fetching countries', error);
      throw error;
    }
  }
);


const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCountries = (state) => state.countries.countries.data;

export default countriesSlice.reducer;
