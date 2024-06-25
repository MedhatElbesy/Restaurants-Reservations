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

// Restaurant Details
import RestaurantDetails from "./components/restaurant/Restaurant.jsx";
import RestaurantHome from "./components/restaurant/home/RestaurantHome.jsx";
import Reservation from "./components/restaurant/reservation/Reservation.jsx";
import Branches from "./components/restaurant/branches/Branches.jsx";
import Menu from "./components/restaurant/menu/Menu.jsx";
import Tables from "./components/restaurant/tables/Tables.jsx";
import MenuCategory from "./components/userDashboard/edit/MenuCategory.jsx";
import MenuItem from "./components/userDashboard/edit/MenuItem.jsx";
import AddMenuItem from "./components/userDashboard/add/AddMenuItem.jsx";
import AddMenuCategory from "./components/userDashboard/add/AddMenuCategory.jsx";

function App() {
  const routes = createRoutesFromElements(
    <>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />

      {/* User Routes */}
      <Route path="/userprofile" element={<UserProfile />} />

      {/* Restaurant Details Routes */}
      <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<RestaurantHome />} />
        <Route path="branches" element={<Branches />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="tables" element={<Tables />} />
      </Route>

      {/* Restaurant Owner Routes */}
      <Route path="/userprofile" element={<UserProfile />} />
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
      <Route path="/user-dashboard/edit-profile" element={<EditProfile />} />
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
