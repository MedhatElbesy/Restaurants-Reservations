import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { state } from '../../api/address/fetchState';


export const fetchStatesAsync = createAsyncThunk(
  'state/fetchStates',
  async (cityId) => {
    return await state(cityId);
  }
);


const stateSlice = createSlice({
  name: 'state',
  initialState: {
    states: [],
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStatesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectStates = (state) => state.state.states.data;

export default stateSlice.reducer;
