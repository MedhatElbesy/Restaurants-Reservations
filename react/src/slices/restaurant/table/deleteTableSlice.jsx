import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTable } from '../../../api/restaurant/delete';


export const deleteTableAsync = createAsyncThunk('tables/deleteTable', async (tableId) => {
  return await deleteTable(tableId);
});


const deleteTableSlice = createSlice({
  name: 'deleteTable',
  initialState: {
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTableAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(deleteTableAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectDeleteTableStatus = (state) => state.deleteTable.status;
export const selectDeleteTableError = (state) => state.deleteTable.error;

export default deleteTableSlice.reducer;
