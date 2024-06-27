import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTable } from '../../../api/restaurant/addRestaurant';

export const addTableAsync = createAsyncThunk('tables/addTable', async (data) => {
  return await addTable(data);
});

const addTableSlice = createSlice({
  name: 'addTable',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTableAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTableAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addTableAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAddTableStatus = (state) => state.addTable.status;
export const selectAddTableError = (state) => state.addTable.error;

export default addTableSlice.reducer;
