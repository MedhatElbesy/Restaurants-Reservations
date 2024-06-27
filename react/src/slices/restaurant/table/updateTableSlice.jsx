import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateTable } from '../../../api/restaurant/updateAtRestaurant';

export const updateTableAsync = createAsyncThunk('tables/updateTable', async ({ tableId, data }) => {
  return await updateTable(tableId, data);
});

const updateTableSlice = createSlice({
  name: 'updateTable',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTableAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTableAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateTableAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUpdateTableStatus = (state) => state.updateTable.status;
export const selectUpdateTableError = (state) => state.updateTable.error;

export default updateTableSlice.reducer;
