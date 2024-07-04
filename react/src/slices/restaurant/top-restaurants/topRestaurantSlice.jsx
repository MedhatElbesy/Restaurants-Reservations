import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { topRestaurants } from '../../../api/restaurant/restaurantFetch';



export const fetchTopRatedRestaurants = createAsyncThunk(
  'topRatedRestaurants/fetchTopRatedRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await topRestaurants();
      return response.data; 
    } catch (error) {
      console.error('An error occurred during fetching top rated restaurant data', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


const topRatedRestaurantsSlice = createSlice({
  name: 'topRatedRestaurants',
  initialState: {
    restaurants: [], 
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedRestaurants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopRatedRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload; 
      })
      .addCase(fetchTopRatedRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});


export const { } = topRatedRestaurantsSlice.actions;
export default topRatedRestaurantsSlice.reducer;

export const selectTopRatedRestaurants = (state) => state.topRatedRestaurants.restaurants;
export const selectTopRatedRestaurantsStatus = (state) => state.topRatedRestaurants.status;
export const selectTopRatedRestaurantsError = (state) => state.topRatedRestaurants.error;
