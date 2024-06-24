import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/login';
import { Provider } from 'react-redux';
import store from './store/Store.jsx';
import Home from './components/homepage/Home.jsx';
import UserProfile from './components/userProfile/userProfilePage/UserProfile.jsx';
import Restaurant from './components/userDashboard/Restaurant.jsx';
import EditCategory from './components/userDashboard/edit/EditCategoryForm.jsx';
import EditLocation from './components/userDashboard/edit/EditLocation.jsx';
import EditDetails from './components/userDashboard/edit/EditDetails.jsx';
import EditProfile from './components/userProfile/editProfile/EditProfile.jsx';
import Register from './components/auth/register/register.jsx';





function App() {
  const routes = createRoutesFromElements(
    <>
    
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/userprofile" element={<UserProfile/>} />
      <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
      <Route path="/edit-restaurant/:restaurantId" element={<EditDetails />} />
      <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      <Route path="/edit-location/:locationId" element={<EditLocation/>} />
      <Route path="/edit-profile" element={<EditProfile />} />
      
      
     
    </>
  );

  const router = createBrowserRouter(routes);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );


}

export default App;
