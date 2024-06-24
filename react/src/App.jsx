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

// User
import UserProfile from "./components/userProfile/userProfilePage/UserProfile.jsx";

// Restaurant Owner
import Restaurant from "./components/userDashboard/Restaurant.jsx";
import EditCategory from "./components/userDashboard/edit/EditCategoryForm.jsx";
import EditLocation from "./components/userDashboard/edit/EditLocation.jsx";
import EditDetails from "./components/userDashboard/edit/EditDetails.jsx";
import EditProfile from "./components/userProfile/editProfile/EditProfile.jsx";

import MyNavbar from "./layouts/nav/My-navbar.jsx";

// Restaurant Details
import RestaurantDetails from "./components/restaurant/Restaurant.jsx";
import RestaurantHome from "./components/restaurant/home/Home.jsx";
import Reservation from "./components/restaurant/reservation/Reservation.jsx";
import Menu from "./components/restaurant/menu/Menu.jsx";
import Tables from "./components/restaurant/tables/Tables.jsx";

function App() {
  const routes = createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route
        path="/restaurant/res/:restaurantId"
        element={<RestaurantDetails />}
      >
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<RestaurantHome />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="tables" element={<Tables />} />
      </Route>

      <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
      <Route path="/edit-restaurant/:restaurantId" element={<EditDetails />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/edit-location/:locationId" element={<EditLocation />} />
      <Route path="/edit-profile" element={<EditProfile />} />
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
