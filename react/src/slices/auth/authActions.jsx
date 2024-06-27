import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/auth/login';
import { register } from '../../api/auth/register';

// login //
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login(email, password);
      console.log('Login response:', response);
      console.log("user data");
      console.log(response.data);
      if (response && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('role', response.data.user.roles_name[0]);
        return response;
      } else {
        throw new Error('Invalid response structure from login API');
      }
    } catch (error) {
      // console.error('Login error:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



// Register //
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      console.log('Register response:', response);
      return response;
    } catch (error) {
      // console.error('Register error:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);