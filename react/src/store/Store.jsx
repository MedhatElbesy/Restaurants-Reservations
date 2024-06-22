import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/loginSlice';
import userReducer from '../slices/user/fetchUserSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
