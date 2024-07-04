import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataById } from '../../api/user/fetchUserData';


export const fetchUserDataById = createAsyncThunk(
  'user/fetchUserDataById',
  async (userId) => {
      const userData = await getUserDataById(userId);
      return userData; 
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDataById.fulfilled, (state, action) => {
        state.data = action.payload.data; 
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserDataById.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
