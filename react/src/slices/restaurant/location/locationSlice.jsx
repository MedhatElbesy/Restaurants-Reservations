import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateLocation } from "../../../api/restaurant/updateAtRestaurant";
import { locationById } from "../../../api/restaurant/restaurantFetch";
import { addLocation } from "../../../api/restaurant/addRestaurant";

export const fetchLocationByIdAsync = createAsyncThunk(
  "location/fetchLocationById",
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await locationById(locationId);
      return response.data;
    } catch (error) {
      console.error('An error occurred during fetching nearest restaurant data', error);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
        message: error.response.data,
      });
    }
  }
);

export const updateLocationAsync = createAsyncThunk(
  "location/updateLocation",
  async ({ locationId, data }, {rejectWithValue}) => {
   try{const updatedData = await updateLocation(locationId, data);
    return updatedData;
   }catch (error) {
    console.error('An error occurred during fetching nearest restaurant data', error);
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.response.data,
    });
  }
  }
);

export const addLocationAsync = createAsyncThunk(
  "location/addLocation",
  async (locationData, { rejectWithValue }) => {
    try {
      const addedLocation = await addLocation(locationData);
      return addedLocation;
    } catch (error) {
      console.error('An error occurred during fetching nearest restaurant data', error);
    return rejectWithValue({
      status: error.response.status,
      data: error.response.data,
      message: error.response.data,
    });
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocationByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(fetchLocationByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateLocationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(updateLocationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addLocationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(addLocationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
