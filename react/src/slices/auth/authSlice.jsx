import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

const initialState = {
  user: null,
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  loggedIn: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
  role: localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      //login 
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data.user) {
          state.user = data.user;
          state.userId = data.user.id;
          state.token = data.token;
          state.loggedIn = true;
          state.role = data.user.roles_name[0];
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('role', data.user.roles_name[0]);
          state.status = 'succeeded';
          state.error = null;
        } else {
          state.status = 'failed';
          state.error = 'Unexpected response structure';
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        if (data && data.user) {
          state.user = data.user;
          state.userId = data.user.id;
          state.token = data.token;
          state.loggedIn = true;
          state.role = data.user.roles_name[0];
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('role', data.user.roles_name[0]);
          state.status = 'succeeded';
          state.error = null;
        } else {
          state.status = 'failed';
          state.error = 'Unexpected response structure';
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
