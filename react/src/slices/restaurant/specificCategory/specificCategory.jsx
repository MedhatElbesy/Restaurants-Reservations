import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { specificCategory } from '../../../api/restaurant/restaurantFetch';

export const fetchSpecificCategoryAsync = createAsyncThunk(
  'specificCategory/fetchCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await specificCategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const specificCategorySlice = createSlice({
  name: 'specificCategory',
  initialState: {
    category: null,
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecificCategoryAsync.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchSpecificCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchSpecificCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default specificCategorySlice.reducer;
