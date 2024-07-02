// reportSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReports, getRatings } from '../../api/adminDashboard/adminDashboard';

export const fetchReports = createAsyncThunk(
  'admin/report',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReports();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);


// ratings
export const fetchRatings = createAsyncThunk(
  "admin/rating",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRatings();
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);
const adminSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
