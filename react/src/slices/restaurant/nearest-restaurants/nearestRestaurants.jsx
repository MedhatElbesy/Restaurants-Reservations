import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nearestRestaurants } from '../../../api/restaurant/restaurantFetch';

export const fetchNearestRestaurants = createAsyncThunk(
  'nearestRestaurants/fetchNearestRestaurants',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await nearestRestaurants(userId);
      return data;
    } catch (error) {
      console.error('An error occurred during fetching nearest restaurant data', error);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data,
      });
    }
  }
);

const nearestRestaurantsSlice = createSlice({
  name: 'nearestRestaurants',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearestRestaurants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNearestRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload.data);
        state.data = action.payload.data || [];
      })
      .addCase(fetchNearestRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default nearestRestaurantsSlice.reducer;
