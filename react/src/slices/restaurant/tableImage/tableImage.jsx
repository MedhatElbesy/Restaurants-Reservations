import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTableImage } from '../../../api/restaurant/addRestaurant';
import { updateTableImage } from '../../../api/restaurant/updateAtRestaurant';
import { fetchTableImageById } from '../../../api/restaurant/restaurantFetch';
import { deleteTableImages } from '../../../api/restaurant/delete';

export const addTableImageAsync = createAsyncThunk(
  'tableImage/addTableImage',
  async (data, rejectWithValue) => {
    try {
      const response = await addTableImage(data);
      return response.data;
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

export const updateTableImageAsync = createAsyncThunk(
  'tableImage/updateTableImage',
  async ({ imageId, data }, rejectWithValue) => {
    try {
      const response = await updateTableImage(imageId, data);
      return response.data;
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

export const fetchTableImageByIdAsync = createAsyncThunk(
  'tableImage/fetchTableImageById',
  async (imageId, rejectWithValue) => {
    try {
      const response = await fetchTableImageById(imageId);
      return response.data;
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

export const deleteTableImageAsync = createAsyncThunk(
  'tableImage/deleteTableImage',
  async (imageId, rejectWithValue) => {
    try {
      const response = await deleteTableImages(imageId);
      return response.data;
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

const tableImageSlice = createSlice({
  name: 'tableImage',
  initialState: {
    status: 'idle',
    error: null,
    images: [],
    selectedImage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTableImageAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images.push(action.payload);
      })
      .addCase(updateTableImageAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.images.findIndex((image) => image.id === action.payload.id);
        if (index !== -1) {
          state.images[index] = action.payload;
        }
      })
      .addCase(fetchTableImageByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedImage = action.payload;
      })
      .addCase(deleteTableImageAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = state.images.filter((image) => image.id !== action.meta.arg);
      })
      .addCase(fetchTableImageByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export default tableImageSlice.reducer;
