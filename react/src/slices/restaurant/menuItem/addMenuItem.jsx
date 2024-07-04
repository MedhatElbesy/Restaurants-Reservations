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
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMenuItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.menuItem = action.payload; 
      })
      .addCase(addMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions, reducer } = menuSlice;
export default reducer;
