import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMenuCategory } from '../../../api/restaurant/addRestaurant';


export const addMenuCategoryThunk = createAsyncThunk(
    'add-Menu-Category/addMenuCategory',
    async (data) => {
       const response = await addMenuCategory(data);
        return response;
      }
  );
  

const addMenuCategorySlice = createSlice({
  name: 'add-Menu-Category',
  initialState: {
    menuCategory: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMenuCategoryThunk .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMenuCategoryThunk .fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menuItem = action.payload; 
      })
      .addCase(addMenuCategoryThunk .rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { actions, reducer } = addMenuCategorySlice;
export default reducer;
