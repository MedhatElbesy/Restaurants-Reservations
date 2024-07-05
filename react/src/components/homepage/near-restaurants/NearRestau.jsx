import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import { fetchNearestRestaurants } from '../../../slices/restaurant/nearest-restaurants/nearestRestaurants';
import '../top-rated/TopRestau.css';
import Loader from '../../../layouts/loader/loader';
import { Link } from 'react-router-dom';

const NearRestau = () => {
  const dispatch = useDispatch();
  const { data: nearestRestaurantsData, status, error } = useSelector(state => state.nearestRestaurants);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchNearestRestaurants(userId));
    }
  }, [userId]);

  if (status === 'loading') {
    return <Loader/>;
  }

  
  return (
    <main className='restau'>
      {nearestRestaurantsData.length > 0 && (
        <>
          <h1 className='text-center custom-color my-5'>Nearest Restaurants</h1>
          <CardSlick>
            {nearestRestaurantsData.map((restaurant, index) => (
              <div key={index} className="restaurant-slide">
                <Link to={`/restaurant/${restaurant.restaurant_id}`}>
                <Card
                  name={restaurant.restaurant_name}
                  image={restaurant.image}
                />
                </Link>
              </div>
            ))}
          </CardSlick>
        </>
      )}
    </main>
  );
};

export default NearRestau;
