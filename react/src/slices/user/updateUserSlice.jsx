import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserData } from '../../api/user/updateUserData';

const initialState = {
  status: 'idle',
  error: null,
};

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUpdateUserStatus = (state) => state.user.status;
export const selectUpdateUserError = (state) => state.user.error;

export default userSlice.reducer;
