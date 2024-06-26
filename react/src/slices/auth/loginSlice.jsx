import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/auth/login';

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await login(email, password);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});


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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userId = action.payload.user.id;
        state.token = action.payload.token;
        state.loggedIn = true;
        state.role = action.payload.user.roles_name[0];
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userId', action.payload.user.id);
        localStorage.setItem('role', action.payload.user.roles_name[0]);
        state.status = 'succeeded';
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { logout} = authSlice.actions;

export default authSlice.reducer;
