import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

// Store
import store from "./store/Store.jsx";

// Authentication
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register.jsx";
import ForgetPassword from "./components/auth/login/forgetPassword.jsx";
import ResetPassword from "./components/auth/login/resetpassword.jsx";

// Home
import Home from "./components/homepage/Home.jsx";

// Layout
import UserProfile from "./components/userProfile/userProfilePage/UserProfile.jsx";
import MyNavbar from "./layouts/nav/My-navbar.jsx";

// Restaurant Owner
import Restaurant from "./components/userDashboard/Restaurant.jsx";
import EditCategory from "./components/userDashboard/edit/EditCategoryForm.jsx";
import EditLocation from "./components/userDashboard/edit/EditLocation.jsx";
import EditDetails from "./components/userDashboard/edit/EditDetails.jsx";
import EditProfile from "./components/userProfile/editProfile/EditProfile.jsx";
import MenuCategory from "./components/userDashboard/edit/MenuCategory.jsx";
import MenuItem from "./components/userDashboard/edit/MenuItem.jsx";
import AddMenuItem from "./components/userDashboard/add/AddMenuItem.jsx";
import AddMenuCategory from "./components/userDashboard/add/AddMenuCategory.jsx";

// Restaurant Details
import RestaurantDetails from "./components/restaurant/Restaurant.jsx";
import RestaurantHome from "./components/restaurant/home/RestaurantHome.jsx";
import Reservation from "./components/restaurant/reservation/Reservation.jsx";
import Branches from "./components/restaurant/branches/Branches.jsx";
import Menu from "./components/restaurant/menu/Menu.jsx";
// import Tables from "./components/restaurant/tables/Tables.jsx";

// Checkout Details
import Checkout from "./components/checkout/Checkout.jsx";


import AddLocation from "./components/userDashboard/add/AddLocation.jsx";
import AddTableForm from "./components/userDashboard/add/AddTableForm.jsx";
import EditTableForm from "./components/userDashboard/edit/EditTableForm.jsx";
import AddRestaurant from "./components/userDashboard/add/AddRestaurant.jsx";
import DetailsTable from "./components/userDashboard/show/DetailsTable.jsx";
import LocationsTable from "./components/userDashboard/show/LocationsTable.jsx";
import LocationTablesTable from "./components/userDashboard/show/LocationTablesTable.jsx";
import MenuCategoriesTable from "./components/userDashboard/show/MenuCategoriesTable.jsx";
import ChangePassword from "./components/userProfile/changePassword/ChangePassword.jsx";
import AddCategoryForm from "./components/userDashboard/add/AddCategoryForm.jsx";
import AddRestaurantCategory from "./components/userDashboard/add/AddRestaurantCategory.jsx";
import EditRestaurantCategory from "./components/userDashboard/edit/EditRestaurantCategory.jsx";

// Admin Dashboard
import AdminDashboard from "./components/AdminDashboard/adminDashboard.jsx";
import { Ratings } from "./components/AdminDashboard/ratings.jsx";
import { Reports } from "./components/AdminDashboard/reports.jsx";
import { Category } from "./components/AdminDashboard/Category.jsx";
import About from "./components/AdminDashboard/About.jsx";
import Verify from "./components/auth/register/verifyPage.jsx";
import AddTableImage from "./components/userDashboard/add/AddTableImage.jsx";
import EditTableImage from "./components/userDashboard/edit/EditTableImage.jsx";
import AddUserAddress from "./components/userProfile/userAddress/AddUserAddress.jsx";
import EditUserAddress from "./components/userProfile/userAddress/EditUserAddress.jsx";
import SpecificCategories from "./components/userDashboard/show/SpecificCategories.jsx";
import TableAvailability from "./components/userDashboard/show/TableAvailability.jsx";
import AddAvailabilityForm from "./components/userDashboard/add/AddTableAvailability.jsx";
import EditTableAvailability from "./components/userDashboard/edit/EditTableAvailability.jsx";
import RestaurantCategory from "./components/userDashboard/show/RestaurantCategory.jsx";

function App() {
  const routes = createRoutesFromElements(
    <>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/specific" element={<SpecificCategories />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />

      {/* User Routes */}
      <Route path="/userprofile" element={<UserProfile />} />

      {/* Restaurant Details Routes */}
      <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<RestaurantHome />} />
        <Route path="branches" element={<Branches />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation/:tableId" element={<Reservation />} />
        {/* <Route path="tables" element={<Tables />} /> */}
      </Route>

      {/* Reservation Checkout */}
      <Route path="/reservation/checkout" element={<Checkout />} />


      {/* Restaurant Owner Routes */}
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/edit-profile/:userId" element={<EditProfile />} />
      <Route path="/change-password/:userId" element={<ChangePassword />} />
      <Route path="/add-address" element={<AddUserAddress />} />
      <Route path="/edit-address/:addressId" element={<EditUserAddress />} />
      <Route path="/availability/:tableId" element={<TableAvailability />} />
      <Route path="/add-availability/:tableId" element={<AddAvailabilityForm />} />
      <Route
        path="/user-dashboard/restaurant/:restaurantId"
        element={<Restaurant />}
      />
      <Route
        path="/user-dashboard/edit-restaurant/:restaurantId"
        element={<EditDetails />}
      />
      <Route
        path="/user-dashboard/edit-category/:categoryId"
        element={<EditCategory />}
      />
      <Route
        path="/user-dashboard/edit-location/:locationId"
        element={<EditLocation />}
      />
    
      <Route
        path="/user-dashboard/edit-menu-category/:menuCategoryId"
        element={<MenuCategory />}
      />
      <Route
        path="/user-dashboard/edit-menu-item/:menuItemId"
        element={<MenuItem />}
      />
      <Route
        path="/user-dashboard/add-item/:menuCategoryId"
        element={<AddMenuItem />}
      />
      <Route
        path="/user-dashboard/add-category/:restaurantId"
        element={<AddMenuCategory />}
      />

      <Route
        path="/user-dashboard/add-location/:restaurantId" 
        element={<AddLocation />} 
      />

      <Route 
        path="/user-dashboard/add-table/:locationId" 
        element={<AddTableForm />} 
      />

      <Route 
        path="/user-dashboard/edit-table/:tableId"
        element={<EditTableForm />} 
      />

      <Route 
        path="/user-dashboard/add-restaurant/:userId"
        element={<AddRestaurant />} 
      />

     <Route 
        path="/user-dashboard/details" 
        element={<DetailsTable />} 
      />

     <Route 
        path="/user-dashboard/location" 
        element={<LocationsTable />} 
      />

     <Route 
        path="/user-dashboard/location-tables" 
        element={<LocationTablesTable />} 
      />

    

     <Route 
        path="/user-dashboard/menu-category" 
        element={<MenuCategoriesTable />} 
      />

     <Route 
        path="/user-dashboard/add-special-category" 
        element={<AddCategoryForm />} 
      />

    <Route 
        path="/user-dashboard/add-restaurant-category/:restaurantId" 
        element={<AddRestaurantCategory />} 
      />

     <Route 
        path="/user-dashboard/edit-restaurant-category/:categoryId" 
        element={<EditRestaurantCategory />} 
      />

     <Route 
        path="/user-dashboard/restaurant-category/:restaurantId" 
        element={<RestaurantCategory />} 
      />

      <Route 
        path="/user-dashboard/add-table-image/:tableId" 
        element={<AddTableImage />} 
      /> 

      <Route 
        path="/user-dashboard/edit-table-image/:imageId" 
        element={<EditTableImage />} 
      />  

     <Route 
        path="/user-dashboard/edit-availability/:availableId" 
        element={<EditTableAvailability />} 
      />  

      {/* AdminDashboard */}
      <Route path="/admin" element={<AdminDashboard/>} />
      <Route path="/admin/rating" element={<Ratings/>} />
      <Route path="/admin/report" element={<Reports/>} />
      <Route path="/admin/category" element={<Category/>} />
      <Route path="/admin/about" element={<About/>} />
    </>
  );

  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <MyNavbar />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
