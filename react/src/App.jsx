import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
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
import Restaurant from "./components/userDashboard/userDashboardRestaurant.jsx";
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
import Tables from "./components/restaurant/restaurant-tables/Tables.jsx";

// Checkout Details
import Checkout from "./components/checkout/Checkout.jsx";

import AddLocation from "./components/userDashboard/add/AddLocation.jsx";
import AddTableForm from "./components/userDashboard/add/AddTableForm.jsx";
import EditTableForm from "./components/userDashboard/edit/EditTableForm.jsx";
import AddRestaurant from "./components/userDashboard/add/AddRestaurant.jsx";
import DetailsTable from "./components/userDashboard/show/DetailsTable.jsx";
import Locations from "./components/userDashboard/show/Locations.jsx";
import MenuCategoriesTable from "./components/userDashboard/show/MenuCategoriesTable.jsx";
import ChangePassword from "./components/userProfile/changePassword/ChangePassword.jsx";
import AddCategoryForm from "./components/userDashboard/add/AddCategoryForm.jsx";
import AddRestaurantCategory from "./components/userDashboard/add/AddRestaurantCategory.jsx";
import EditRestaurantCategory from "./components/userDashboard/edit/EditRestaurantCategory.jsx";

// Admin Dashboard
import AdminDashboard from "./components/AdminDashboard/adminDashboard.jsx";
import Ratings from "./components/AdminDashboard/ratings.jsx";
import ReportList from "./components/AdminDashboard/reports.jsx";
import About from "./components/AdminDashboard/About.jsx";
import Verify from "./components/auth/register/verifyPage.jsx";
import AddTableImage from "./components/userDashboard/add/AddTableImage.jsx";
import EditTableImage from "./components/userDashboard/edit/EditTableImage.jsx";
import AddUserAddress from "./components/userProfile/userAddress/AddUserAddress.jsx";
import EditUserAddress from "./components/userProfile/userAddress/EditUserAddress.jsx";
import SpecificCategories from "./components/userDashboard/show/SpecificCategories.jsx";

import AddAvailabilityForm from "./components/userDashboard/add/AddTableAvailability.jsx";
import EditTableAvailability from "./components/userDashboard/edit/EditTableAvailability.jsx";
import RestaurantCategory from "./components/userDashboard/show/RestaurantCategory.jsx";
import UserDashboardHome from "./components/userDashboard/show/UserDashboardHome.jsx";
import RestaurantList from "./components/AdminDashboard/restaurantList.jsx";
// import RestaurantShow from "./components/AdminDashboard/AddRestaurant.jsx";
import CommentsAdmin from "./components/AdminDashboard/comments.jsx";
import AddRest from "./components/AdminDashboard/AddRestaurant.jsx";
import ShowReservation from "./components/userDashboard/show/ShowReservation.jsx";

// notifaication and about us
import RestaurantLocationNotifications from "./components/Notification/RestaurantLocationNotifications.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";

// Protected Routes
import { ProtectedRoute, PublicRoute } from "./helpers/ProotectedRoutes.jsx";
import AdminCategories from "./components/AdminDashboard/AdminCategories.jsx";

import AllRestaurantsPage from "./components/homepage/AllRestaurantsPage.jsx";
import UserRestaurant from "./components/userProfile/userProfilePage/UserRestaurant.jsx";
import Sidebar from "./layouts/Sidebar.jsx";
import EditCategoryForm from "./components/userDashboard/edit/EditCategoryForm.jsx";


const Layout = () => (
  <>
    <MyNavbar />
    <Outlet />
  </>
);

function App() {
  const routes = createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      {/* Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      {/* User Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Restaurant Details Routes */}
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<RestaurantHome />} />
          
          <Route path="branches" element={<Branches />} />
          <Route path="menu" element={<Menu />} />
          <Route path="reservation/:tableId" element={<Reservation />} />
          <Route path="tables" element={<Tables />} />
        </Route>
        {/* Reservation Checkout */}
        <Route path="/reservation/checkout" element={<Checkout />} />{" "}
        {/* all user logged  */}
        <Route path="/userprofile" element={<UserProfile />} >

      
        </Route>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/add-address" element={<AddUserAddress />} />
        <Route path="/edit-address/:addressId" element={<EditUserAddress />} />
      </Route>

      {/* Owner only */}
    
        {/* Restaurant Owner Routes */}
        <Route path="/specific" element={<SpecificCategories />} />
        <Route path="/user-restaurants" element={<UserRestaurant />} />
        
        <Route
          path="/user-dashboard/restaurant/:restaurantId"
          element={<Sidebar />}
        >
          <Route path="main" element={<UserDashboardHome />} />

          <Route path="details" element={<DetailsTable />} />

          <Route path="locations" element={<Locations />} />

          <Route path="menu-category" element={<MenuCategoriesTable />} />

          <Route path="category" element={<SpecificCategories />} />

          <Route path="restaurant-category" element={<RestaurantCategory />} />

          <Route
            path="location-table/:locationId"
            element={<RestaurantCategory />}
          />

          <Route path="reservation" element={<ShowReservation />} />
        
      </Route>
      {/* Owner and Admin */}
      <Route element={<ProtectedRoute owner={true} admin={true} />}>
        <Route
          path="/edit-restaurant/:restaurantId"
          element={<EditDetails />}
        />
        <Route path="/edit-category/:categoryId" element={<EditCategoryForm />} />
        <Route path="/edit-location/:locationId" element={<EditLocation />} />
        <Route
          path="/edit-restaurant/:restaurantId"
          element={<EditDetails />}
        />
        <Route
          path="/edit-menu-category/:menuCategoryId"
          element={<MenuCategory />}
        />
        <Route path="/edit-item/:menuItemId" element={<MenuItem />} />
        <Route path="/add-item/:menuCategoryId" element={<AddMenuItem />} />
        <Route
          path="/add-category/:restaurantId"
          element={<AddMenuCategory />}
        />
        <Route path="/add-location/:restaurantId" element={<AddLocation />} />
        <Route path="/add-table/:locationId" element={<AddTableForm />} />
        <Route path="/edit-table/:tableId" element={<EditTableForm />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/add-special-category" element={<AddCategoryForm />} />
        <Route
          path="/add-restaurant-category/:restaurantId"
          element={<AddRestaurantCategory />}
        />
        <Route
          path="/edit-restaurant-category/:categoryId"
          element={<EditRestaurantCategory />}
        />
        <Route path="/add-table-image/:tableId" element={<AddTableImage />} />
        <Route path="/edit-table-image/:imageId" element={<EditTableImage />} />
        <Route
          path="/edit-availability/:availableId"
          element={<EditTableAvailability />}
        />

       <Route
          path="/add-availability/:tableId"
          element={<AddAvailabilityForm />}
        />
      </Route>
      {/* AdminDashboard */}
      {/*<Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/rating" element={<Ratings />} />
      <Route path="/admin/report" element={<ReportList />} />
      <Route path="/admin/about" element={<About />} />
      <Route path="/admin/comments" element={<CommentsAdmin />} />
      <Route path="/admin/restaurants" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantShow />} />
      </Route> */}
      {/* AdminDashboard */}
      {/* <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/rating" element={<Ratings />} />
      <Route path="/admin/report" element={<ReportList />} />
      <Route path="/admin/category" element={<Category/>} />
      <Route path="/admin/about" element={<About />} />
      <Route path="/admin/restaurant" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantShow />} /> */}
      {/* Admin Routes  Edited By : Nagy*/}
      {/* Admin Only */}
      <Route element={<ProtectedRoute  admin={true} />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="rating" element={<Ratings />} />
          <Route path="report" element={<ReportList />} />
          <Route path="about" element={<About />} />
          <Route path="comments" element={<CommentsAdmin />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route path="category" element={<AdminCategories />} />
        </Route>
        <Route path="/add-restaurant/:id" element={<AddRest />} />
      </Route>
      <Route path="/notify" element={<RestaurantLocationNotifications />} />
      <Route path="all-restaurants" element={<AllRestaurantsPage />} />
     
    </Route>
  );

  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
