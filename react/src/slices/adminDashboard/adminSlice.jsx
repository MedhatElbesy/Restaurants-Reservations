import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReports, getRatings, getComments,getRestaurants, updateRestaurant, disableRestaurant } from '../../api/adminDashboard/adminDashboard';

// Restaurant Categories
export const fetchRestaurants = createAsyncThunk(
  "admin/restaurants",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRestaurants();
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

export const disableRestaurantById = createAsyncThunk(
  "restaurants/disableRestaurantById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await disableRestaurant(id);
      return response;
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
  "admin/comments",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getComments();
      console.log(data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "admin/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      console.log(commentId);
      return commentId;
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
      .addCase(disableRestaurantById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(disableRestaurantById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.restaurants.findIndex(
          (restaurant) => restaurant.id === action.meta.arg
        );
        if (index !== -1) {
          state.restaurants[index].status = "inactive";
        }
      })
      .addCase(disableRestaurantById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Reports
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = Array.isArray(action.payload) ? action.payload : [];
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
        state.ratings = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Comments
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
