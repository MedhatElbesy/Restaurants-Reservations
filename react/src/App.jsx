import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import LoginForm from './components/auth/login/login';
import { Provider } from 'react-redux';
import store from './store/Store.jsx';
import Home from './components/homepage/Home.jsx';
import UserProfile from './components/userProfile/UserProfile.jsx';




function App() {
  const routes = createRoutesFromElements(
    <>
    
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/userprofile" element={<UserProfile/>} />

      
      
     
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
