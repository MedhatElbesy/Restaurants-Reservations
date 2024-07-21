import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataById } from '../../api/user/fetchUserData';
import { updateUserData } from '../../api/user/updateUserData';
import { addUserAddress, updateUserAddress } from '../../api/user/userAddress';
import { deleteRestaurant } from '../../api/restaurant/delete';
import { addRestaurant } from '../../api/restaurant/addRestaurant';



export const fetchUserDataById = createAsyncThunk(
  'user/fetchUserDataById',
  async (userId) => {
    const userData = await getUserDataById(userId);
    return userData;
  }
);


export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data }) => {
    try {
      const response = await updateUserData(userId, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addRestaurantAsync = createAsyncThunk(
  "restaurant/addRestaurant",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await addRestaurant(formData);
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


export const deleteRestaurantAsync = createAsyncThunk(
  "restaurant/deleteRestaurant",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await deleteRestaurant(restaurantId);
      return response; 
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);



export const addUserAddressAsync = createAsyncThunk(
  'user/addUserAddress',
  async ({ userId, addressData }, thunkAPI) => {
    try {
      const response = await addUserAddress(userId, addressData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateUserAddressAsync = createAsyncThunk(
  'user/updateUserAddress',
  async ({ userId, addressId, addressData }) => {
    try {
      const response = await updateUserAddress(userId, addressId, addressData);
      return response; 
    } catch (error) {
      throw error;
    }
  }
);





const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataById.fulfilled, (state, action) => {
        state.data = action.payload.data; 
        state.status = 'succeeded';
        state.loading = false;
      })
     
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.data = action.payload.data;
      })
     
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data && state.data.addresses) {
          state.data.addresses.push(action.payload); 
        }
      })
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        const updatedAddress = action.payload.data; 
        if (state.data && state.data.addresses) {
          state.data.addresses = state.data.addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          );
        }
      })
      .addCase(addRestaurantAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        if (state.data && state.data.restaurants) {
          state.data.restaurants.push(action.payload.data);
        }
      })
      .addCase(deleteRestaurantAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        const deletedId = action.payload.data.deleted_id;
        if (state.data && state.data.restaurants) {
          state.data.restaurants = state.data.restaurants.filter(
            (restaurant) => restaurant.id !== deletedId
          );
        }
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

export const { resetUserState } = userSlice.actions;
export const selectUserData = (state) => state.user.data;
export const selectUserStatus = (state) => state.user.status;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
