import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReports, getRatings, getComments,getRestaurants, updateRestaurant, deleteRestaurant } from '../../api/adminDashboard/adminDashboard';

// Restaurant Categories
export const fetchRestaurants = createAsyncThunk(
  "admin/category",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRestaurants();
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
// export const addNewRestaurant = createAsyncThunk(
//   'restaurants/addNewRestaurant',
//   async (restaurantData, { rejectWithValue }) => {
//     try {
//       const data = await createRestaurant(restaurantData);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const updateExistingRestaurant = createAsyncThunk(
  'restaurants/updateExistingRestaurant',
  async ({ id, restaurantData }, { rejectWithValue }) => {
    try {
      const data = await updateRestaurant(id, restaurantData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeRestaurant = createAsyncThunk(
  'restaurants/removeRestaurant',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteRestaurant(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//reports
export const fetchReports = createAsyncThunk(
  'admin/report',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getReports();
      console.log(response.data);
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


// ratings
export const fetchRatings = createAsyncThunk(
  "admin/rating",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRatings();
      console.log(response.data)
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

//comments
export const fetchComments = createAsyncThunk(
  "admin/comment",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getComments();
      console.log(data)
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
    ratings: [],
    comments: [],
    restaurants: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Restaurant Categories
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants =  Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload;
      })
      // .addCase(addNewRestaurant.fulfilled, (state, action) => {
      //   state.restaurants.push(action.payload);
      // })
      .addCase(updateExistingRestaurant.fulfilled, (state, action) => {
        const updatedIndex = state.restaurants.findIndex((item) => item.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.restaurants[updatedIndex] = action.payload;
        }
      })
      .addCase(removeRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter((item) => item.id !== action.payload.id);
      })

      // Reports
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Ratings
      .addCase(fetchRatings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
