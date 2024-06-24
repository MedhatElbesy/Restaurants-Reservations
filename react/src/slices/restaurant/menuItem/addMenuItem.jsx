import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMenuItem } from '../../../api/restaurant/addRestaurant';


export const addMenuItemThunk = createAsyncThunk(
    'menu/addMenuItem',
    async (data) => {
     
        const response = await addMenuItem(data);
        return response;
     
    }
  );

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuItem: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMenuItemThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMenuItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuItem = action.payload; 
      })
      .addCase(addMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { actions, reducer } = menuSlice;
export default reducer;
