import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/user/updateUserData';

export const updateUserDataAsync = createAsyncThunk(
  'user/updateUserData',
  async ({ userId, data }) => {
    try {
      const response = await updateUserData(userId, data);
      return response;
    } catch (error) {
        throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
