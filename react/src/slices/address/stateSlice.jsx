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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStatesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.states = action.payload;
      })
      .addCase(fetchStatesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectStates = (state) => state.state.states.data;

export default stateSlice.reducer;
