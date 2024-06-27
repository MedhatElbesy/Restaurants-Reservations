import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTable } from '../../../api/restaurant/delete';


export const deleteTableAsync = createAsyncThunk('tables/deleteTable', async (tableId) => {
  return await deleteTable(tableId);
});


const deleteTableSlice = createSlice({
  name: 'deleteTable',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTableAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTableAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteTableAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectDeleteTableStatus = (state) => state.deleteTable.status;
export const selectDeleteTableError = (state) => state.deleteTable.error;

export default deleteTableSlice.reducer;
