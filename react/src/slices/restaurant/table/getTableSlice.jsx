import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tableById } from '../../../api/restaurant/restaurantFetch';

export const fetchTableByIdAsync = createAsyncThunk('tables/fetchTableById', async (tableId) => {
    const response = await tableById(tableId);
    return response.data;
});

const fetchTableByIdSlice = createSlice({
  name: 'fetchTableById',
  initialState: {
    table: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTableByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.table = action.payload;
      })
      .addCase(fetchTableByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectFetchTableByIdStatus = (state) => state.fetchTableById.status;
export const selectFetchTableByIdError = (state) => state.fetchTableById.error;
export const selectTable = (state) => state.fetchTableById.table;

export default fetchTableByIdSlice.reducer;
