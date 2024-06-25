import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/loginSlice';
import userReducer from '../slices/user/fetchUserSlice';
import restaurantReducer from '../slices/restaurant/restaurantSlice';
import categoryReducer from '../slices/restaurant/category/categorySlice'; 
import menuCategoryReducer from '../slices/restaurant/menuCategory/FetchMenuCategoryById';
import allMenuCategoryReducer from '../slices/restaurant/menuCategory/fetchAllMenuCategory'; 
import menuItemReducer from '../slices/restaurant/menuItem/fetchMenuItemById'; 
import updateMenuItemReducer from '../slices/restaurant/menuItem/updateMenuItem'; 
import menuReducer from '../slices/restaurant/menuItem/addMenuItem';
import menuCategoryUpdateReducer from '../slices/restaurant/menuCategory/updateMenuCategory'; 
import deleteMenuCategoryReducer from '../slices/restaurant/menuCategory/deleteMenuCategorySlice';
import deleteMenuItemReducer from '../slices/restaurant/menuItem/deleteMenuItemSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    restaurant: restaurantReducer,
    category: categoryReducer, 
    menuCategory: menuCategoryReducer,
    allMenuCategory: allMenuCategoryReducer,
    menuItem: menuItemReducer,
    updateMenuItem: updateMenuItemReducer,
    menu: menuReducer,
    menuCategoryUpdate: menuCategoryUpdateReducer,
    deleteMenuCategory: deleteMenuCategoryReducer,
    deleteMenuItem:deleteMenuItemReducer
  
  },
});

export default store;
