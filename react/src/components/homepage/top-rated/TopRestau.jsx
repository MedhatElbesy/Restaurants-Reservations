import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTopRatedRestaurants,
  selectTopRatedRestaurants,
  selectTopRatedRestaurantsStatus,
} from '../../../slices/restaurant/top-restaurants/topRestaurantSlice'; 
import './TopRestau.css'; 
import { NavLink } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';

export default function TopRestau() {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectTopRatedRestaurants);
  const status = useSelector(selectTopRatedRestaurantsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopRatedRestaurants());
    }
  }, [status]);

  if (status === 'loading') {
    return <Loader/>;
  }

  if (restaurants.length === 0) {
    return null; 
  }

  return (
    <main className="top-restau">

      {restaurants.length > 0 && <h1 className="title my-5">Explore Highly Acclaimed Restaurants</h1>}

      <section className="restaurant-grid">

        {restaurants.map((restaurant, index) => (
          <NavLink 
            key={restaurant.restaurant_location_id} 
            to={`/restaurant/${restaurant.restaurant_location_id}`} 
            className={`restaurant-card my-5 card-${index + 1}`}
          >
            <img 
              src={restaurant.location_image} 
              alt={restaurant.restaurant_name} 
              className="restaurant-image" 
            />
            <div className="restaurant-name">{restaurant.restaurant_name}</div>
          </NavLink>
        ))}

      </section>
      
    </main>
  );
}
