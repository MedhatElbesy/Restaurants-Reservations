import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTableImage } from '../../../api/restaurant/addRestaurant';
import { updateTableImage } from '../../../api/restaurant/updateAtRestaurant';
import { fetchTableImageById } from '../../../api/restaurant/restaurantFetch';
import { deleteTableImages } from '../../../api/restaurant/delete';

export const addTableImageAsync = createAsyncThunk(
  'tableImage/addTableImage',
  async (data, thunkAPI) => {
    try {
      const response = await addTableImage(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTableImageAsync = createAsyncThunk(
  'tableImage/updateTableImage',
  async ({ imageId, data }, thunkAPI) => {
    try {
      const response = await updateTableImage(imageId, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTableImageByIdAsync = createAsyncThunk(
  'tableImage/fetchTableImageById',
  async (imageId, thunkAPI) => {
    try {
      const response = await fetchTableImageById(imageId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTableImageAsync = createAsyncThunk(
  'tableImage/deleteTableImage',
  async (imageId, thunkAPI) => {
    try {
      const response = await deleteTableImages(imageId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export default tableImageSlice.reducer;
