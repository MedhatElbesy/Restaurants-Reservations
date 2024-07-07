import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { encryptData, decryptData } from "../../helpers/cryptoUtils";

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
        message: error.response.data,
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
    userId: decryptData("userId"),
    token: decryptData("token"),
    loggedIn: !!decryptData("token"),
    status: "idle",
    loading: false,
    error: null,
    role: decryptData("role"),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
      state.role = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        state.status = "succeeded";
        // Encrypt sensitive data
        sessionStorage.setItem("token", encryptData(data.token));
        sessionStorage.setItem("userId", encryptData(data.user.id));
        sessionStorage.setItem("role", encryptData(data.user.roles_name));

        state.loggedIn = true;
        state.user = data.user;
        state.userId = data.user.id;
        state.token = data.token;
        state.role = data.user.roles_name;
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
