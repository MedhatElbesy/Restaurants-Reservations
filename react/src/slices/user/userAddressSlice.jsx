import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addUserAddress, updateUserAddress, fetchUserAddress, deleteUserAddress } from '../../api/user/userAddress'; 


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
  async ({ userId, addressId, addressData }, thunkAPI) => {
    try {
      const response = await updateUserAddress(userId, addressId, addressData);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const fetchUserAddressAsync = createAsyncThunk(
  'user/fetchUserAddress',
  async ({ userId, addressId }, thunkAPI) => {
    try {
      const response = await fetchUserAddress(userId, addressId);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const deleteUserAddressAsync = createAsyncThunk(
  'user/deleteUserAddress',
  async ({ userId, addressId }, thunkAPI) => {
    try {
      const response = await deleteUserAddress(userId, addressId);
      return { addressId, message: response.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);


const userSlice = createSlice({
  name: 'userAddress',
  initialState: {
    userAddress: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.userAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
     
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
    
     
      .addCase(fetchUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userAddress = action.payload; 
      })
      
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { resetUserState } = userSlice.actions; 
export default userSlice.reducer;
