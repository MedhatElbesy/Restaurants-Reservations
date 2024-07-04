import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Outlet, useParams } from 'react-router-dom';
import Loader from '../../layouts/loader/loader';
import { fetchRestaurantById } from '../../slices/restaurant/restaurantSlice';
import Sidebar from '../../layouts/Sidebar';
import './Restaurant.css';
import { RestaurantProvider } from './RestaurantContext';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const status = useSelector((state) => state.restaurant.status);
 
  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);

  if (status === 'loading') {
    return <Loader />;
  }

 

  return (
    <RestaurantProvider restaurantId={restaurantId} restaurant={restaurant} >
      <div className="restaurant-container row">
        <Sidebar />
        <main className="container-fluid restaurant col-10 offset-2">
          <div className="restaurant-content">
            <Outlet />
          </div>
        </main>
      </div>
    </RestaurantProvider>
  );
};

export default Restaurant;
