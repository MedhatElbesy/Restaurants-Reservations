import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {updateRestaurant} from '../../api/restaurant/updateAtRestaurant';
import {getRestaurantById } from '../../api/restaurant/restaurantFetch';



export const updateRestaurantAsync = createAsyncThunk(
  'restaurant/updateRestaurant',
  async ({ restaurantId, formData }) => {
      const data= await updateRestaurant(restaurantId,formData)
      return data;
  }
);


export const fetchRestaurantById = createAsyncThunk(
  'restaurant/fetchById',
  async (restaurantId) => {
    const data = await getRestaurantById(restaurantId);
      return data;
  }
);


const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurant: null,
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurant = action.payload.data;
      })
      .addCase(updateRestaurantAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurant = action.payload.data;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export default restaurantSlice.reducer;
