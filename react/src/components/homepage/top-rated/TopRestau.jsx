import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import Loader from '../../../layouts/loader/loader';
import {
  fetchTopRatedRestaurants,
  selectTopRatedRestaurants,
  selectTopRatedRestaurantsStatus,
} from '../../../slices/restaurant/top-restaurants/topRestaurantSlice'; 
import './TopRestau.css';


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
    return <Loader />;
  }



  return (
    <main className='restau'>
    {restaurants.length > 0 && (
      <>
        <h1 className='row text-center custom-color my-5'>
          Top Rated Restaurants
        </h1>
        <CardSlick>
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-slide">
              <Card name={restaurant.restaurant_name} image={restaurant.location_image} />
            </div>
          ))}
        </CardSlick>
      </>
    )}
  </main>
  );
}
