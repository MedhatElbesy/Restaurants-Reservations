import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgetPasswordUser,
  resetPasswordUser,
} from "../../api/auth/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);
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

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
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

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, { rejectWithValue }) => {
    console.log(email);
    try {
      const data = await forgetPasswordUser(email);
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, password_confirmation }, { rejectWithValue }) => {
    try {
      const data = await resetPasswordUser(
        token,
        password,
        password_confirmation
      );
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
    loggedIn: !!localStorage.getItem("token"),
    status: "idle",
    loading: false,
    error: null,
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        state.status = "succeeded";
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role_name);
        state.loggedIn = true;
        state.user = data.user;
        state.userId = data.user.id;
        state.token = data.token;
        state.role = data.user.role_name;
      })
      // register
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      // forgetPassword
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "passwordResetEmailSent";
      })
      // resetPassword
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "passwordReset";
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
