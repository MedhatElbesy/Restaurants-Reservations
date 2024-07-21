import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserAddress, deleteUserAddress } from '../../api/user/userAddress'; 


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
