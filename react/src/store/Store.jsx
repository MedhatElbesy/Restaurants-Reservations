import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/loginSlice';
import userReducer from '../slices/user/fetchUserSlice';
import restaurantReducer from '../slices/restaurant/restaurantSlice';
import categoryReducer from '../slices/restaurant/categorySlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    restaurant: restaurantReducer,
    category: categoryReducer, 
  },
});

export default store;
