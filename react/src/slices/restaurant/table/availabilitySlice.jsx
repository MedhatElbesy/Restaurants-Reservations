import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getAvailabilityById
} from "../../../api/restaurant/table-availability/tableAvailability";

export const getTableAvailability = createAsyncThunk(
  "availability/getAvailability",
  async (tableId, { rejectWithValue }) => {
    try {
      const data = await getAvailability(tableId);
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

export const getTableAvailabilityById = createAsyncThunk(
  "availability/getAvailabilityById",
  async (tableAvailabilityId, { rejectWithValue }) => {
    try {
      const data = await getAvailabilityById(tableAvailabilityId);
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


export const addTableAvailability = createAsyncThunk(
  "availability/addAvailability",
  async (availableData, { rejectWithValue }) => {
    try {
      const data = await addAvailability(availableData);
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


export const updateTableAvailability = createAsyncThunk(
  "availability/updateAvailability",
  async ({ availabilityId, availableData }, { rejectWithValue }) => {
    try {
      const data = await updateAvailability(availabilityId, availableData);
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

export const deleteTableAvailability = createAsyncThunk(
  "availability/deleteAvailability",
  async (availabilityId, { rejectWithValue }) => {
    try {
      const data = await deleteAvailability(availabilityId);
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

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    tableAvailability: null,
    availabilityTable:null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.tableAvailability = action.payload.data;
      })
      .addCase(getTableAvailabilityById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.availabilityTable = action.payload.data; 
      })
      .addCase(addTableAvailability.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(updateTableAvailability.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(deleteTableAvailability.fulfilled, (state, action) => {
        state.tableAvailability = state.tableAvailability.filter(
          (available) => available.id !== action.payload
        );
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(getTableAvailabilityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTableAvailability.pending, (state) => {
        state.loading = true;
      })
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

export default availabilitySlice.reducer;
