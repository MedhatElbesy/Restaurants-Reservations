import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getBranchComments = createAsyncThunk(
  "comments/getBranchComments",
  async (branchId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/comments/${branchId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({comment, branchId}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/comments/${branchId}`, comment);
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ comment, commentId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/comments/${commentId}/?method='PUT'`,
        comment
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    branchComments: [],
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.branchComments = action.payload.data;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branchComments.push(action.payload.data);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.branchComments = state.branchComments.filter(
          (comment) => comment.id !== action.payload.data.id
        );
        state.branchComments.push(action.payload.data);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.branchComments = state.branchComments.filter(
          (comment) => comment.id !== action.payload.data.id
        );
        state.status = "succeeded";
        state.restaurant = null;
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

export default commentsSlice.reducer;
