import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { governorate} from '../../api/address/fetchGovernament';


export const fetchGovernoratesAsync = createAsyncThunk(
  'governorate/fetchGovernorates',
  async (countryId) => {
      return await governorate(countryId); 
  }
);


const governorateSlice = createSlice({
  name: 'governorate',
    initialState :{
    governorates: [],
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGovernoratesAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchGovernoratesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.governorates = action.payload;
      })
      .addCase(fetchGovernoratesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setGovernorates, setStatus, setError } = governorateSlice.actions;
export const selectGovernorates = (state) => state.governorate.governorates.data;

export default governorateSlice.reducer;
