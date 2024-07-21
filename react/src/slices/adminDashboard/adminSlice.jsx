import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReports, getRatings, getComments, getRestaurants, updateRestaurant, getCities, getGovernorates } from '../../api/adminDashboard/adminDashboard';
import axios from '../../axios';

// Fetch users
export const fetchUsers = createAsyncThunk('admin/users', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/login'); 
    return response.data.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Add a user
export const addUser = createAsyncThunk('admin/addUser', async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post('/login', user);
    return response.data.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Update a user
export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, user }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/profile/update/${id}`, user); 
    return response.data.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Delete a user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/users/${id}`); 
    return id;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});


// Restaurant Categories
export const fetchRestaurants = createAsyncThunk(
  "admin/restaurants",
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

export const updateRestaurantStatus = createAsyncThunk('adminDashboard/updateRestaurantStatus', async ({ id, status }) => {
  try {
    const response = await axios.put(`/restaurants/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Cities
export const fetchCities = createAsyncThunk('admin/cities', async (_, { rejectWithValue }) => {
  try {
    const response = await getCities();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Governorates
export const fetchGovernorates = createAsyncThunk('admin/governorates', async (_, { rejectWithValue }) => {
  try {
    const response = await getGovernorates();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Reports
export const fetchReports = createAsyncThunk('admin/report', async (_, { rejectWithValue }) => {
  try {
    const response = await getReports();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Ratings
export const fetchRatings = createAsyncThunk('admin/rating', async (_, { rejectWithValue }) => {
  try {
    const response = await getRatings();
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

// Comments
export const fetchComments = createAsyncThunk('admin/comments', async (_, { rejectWithValue }) => {
  try {
    const data = await getComments();
    return data.data;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

export const deleteComment = createAsyncThunk('admin/deleteComment', async (commentId, { rejectWithValue }) => {
  try {
    await axios.delete(`/comments/${commentId}`);
    return commentId;
  } catch (error) {
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    });
  }
});

const adminSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    reports: [],
    ratings: [],
    comments: [],
    users: [],
    restaurants: [],
    cities: [],
    governorates: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addCity: (state, action) => {
      const newCity = { ...action.payload, id: Date.now() };
      state.cities.push(newCity);
    },
    updateCity: (state, action) => {
      const index = state.cities.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      // Restaurant Categories
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateRestaurantStatus.fulfilled, (state, action) => {
        const updatedRestaurant = action.payload;
        const index = state.restaurants.findIndex((restaurant) => restaurant.id === updatedRestaurant.id);
        if (index !== -1) {
          state.restaurants[index].status = updatedRestaurant.status;
        }
      })
      .addCase(updateExistingRestaurant.fulfilled, (state, action) => {
        const updatedIndex = state.restaurants.findIndex((item) => item.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.restaurants[updatedIndex] = action.payload;
        }
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
        state.comments = Array.isArray(action.payload) ? action.payload : [];
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
      })

      // Cities
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Governorates
      .addCase(fetchGovernorates.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGovernorates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.governorates = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchGovernorates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      ;
  },
});
export const { addCity, updateCity, deleteCity } = adminSlice.actions;
export default adminSlice.reducer;
