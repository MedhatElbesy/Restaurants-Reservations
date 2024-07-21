import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FetchMenuCategoryItems } from '../../../api/restaurant/restaurantFetch';
import { updateMenuItem } from '../../../api/restaurant/updateAtRestaurant';


export const fetchMenuCategoryItemsAsync = createAsyncThunk(
  'menuCategoryItems/fetchMenuCategoryItems',
  async (menuCategoryId, { rejectWithValue }) => {
    try {
      const response = await FetchMenuCategoryItems(menuCategoryId);
      return response.data; 
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

export const updateMenuItemThunk = createAsyncThunk(
  'menuCategoryItems/updateMenuItem',
  async ({ menuItemId, data }, { rejectWithValue }) => {
    try {
      const response = await updateMenuItem(menuItemId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);


const menuCategoryItemsSlice = createSlice({
  name: 'menuCategoryItems',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategoryItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuCategoryItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuCategoryItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =  action.payload;
      })
      .addCase(updateMenuItemThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateMenuItemThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default menuCategoryItemsSlice.reducer;
