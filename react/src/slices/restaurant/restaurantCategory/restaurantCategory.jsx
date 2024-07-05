import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addRestaurantCategory } from '../../../api/restaurant/addRestaurant';
import { fetchAllCategory, fetchAllRestaurantCategoryById , restaurantCategory} from '../../../api/restaurant/restaurantFetch';
import { editRestaurantCategory } from '../../../api/restaurant/updateAtRestaurant';
import { deleteRestaurantCategory } from '../../../api/restaurant/delete';


export const addCategoryAsync = createAsyncThunk('restaurantCategory/addCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await addRestaurantCategory(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const deleteCategoryAsync = createAsyncThunk(
  'restaurantCategory/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await deleteRestaurantCategory(categoryId);
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRestaurantCategoryAsync = createAsyncThunk(
  'restaurantCategory/fetchRestaurantCategory',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await restaurantCategory(restaurantId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllCategoryAsync = createAsyncThunk('restaurantCategory/fetchAllCategory', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllCategory();
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const fetchCategoryByIdAsync = createAsyncThunk('restaurantCategory/fetchCategoryById', async (categoryId, { rejectWithValue }) => {
  try {
    const response = await fetchAllRestaurantCategoryById(categoryId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const updateCategoryAsync = createAsyncThunk('restaurantCategory/updateCategory', async ({ categoryId, data }, { rejectWithValue }) => {
  try {
    const response = await editRestaurantCategory(categoryId, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


const restaurantCategorySlice = createSlice({
  name: 'restaurantCategory',
  initialState: {
    categories: [],
    category: null,
    restaurantCategory:null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchRestaurantCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurantCategory = action.payload; 
      })
      .addCase(fetchCategoryByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload.data;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = state.categories.filter(category => category.id !== action.payload);
      })
      .addCase(fetchCategoryByIdAsync.pending, (state) => {
        state.status = 'loading';
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

export default restaurantCategorySlice.reducer;
