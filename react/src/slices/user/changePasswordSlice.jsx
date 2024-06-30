import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword } from "../../api/user/updateUserData"; 


export const changePasswordAsync = createAsyncThunk(
  "changePassword/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await changePassword(formData);
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

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default changePasswordSlice.reducer;
