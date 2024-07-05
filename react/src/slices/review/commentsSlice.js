import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllComments,
  addUserComment,
  updateUserComment,
  deleteUserComment,
} from "../../api/restaurant/review/comments";

export const getBranchComments = createAsyncThunk(
  "comments/getBranchComments",
  async (branchId, { rejectWithValue }) => {
    try {
      const data = await getAllComments(branchId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ comment, branchId }, { rejectWithValue }) => {
    try {
      const response = await addUserComment(comment, branchId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ comment, commentId }, { rejectWithValue }) => {
    try {
      const data = await updateUserComment(comment, commentId);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const data = await deleteUserComment(commentId);
      return data;
    } catch (error) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
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
        state.branchComments = action.payload.data.comments;
      })
      .addCase(addComment.fulfilled, (state,action) => {
        state.status = "succeeded";
        state.loading = false;
        console.log(state.branchComments);
        console.log(action.payload.data);
        state.branchComments.push(action.payload.data.comment);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.branchComments = state.branchComments.map((comment) =>
          comment.id === action.payload.data.id ? action.payload.data : comment
      );
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.loading = false;
      state.branchComments = state.branchComments.filter(
        (comment) => comment.id !== action.payload.data.id
      );
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
