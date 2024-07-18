import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import { fetchNearestRestaurants } from '../../../slices/restaurant/nearest-restaurants/nearestRestaurants';
import Loader from '../../../layouts/loader/loader';
import { Link, NavLink } from 'react-router-dom';
import { decryptData } from '../../../helpers/cryptoUtils';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';

const NearRestau = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const { data: nearestRestaurantsData, status } = useSelector(state => state.nearestRestaurants);
  const userId = decryptData('userId');

  useEffect(() => {
    if(userId){
        dispatch(fetchNearestRestaurants(userId));
    }
  }, [userId]);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <main className='restau'>
      {nearestRestaurantsData.length > 3 && (
        <div className='row my-5'>
          <h1 className='col-10 mx-3 my-5'>Nearest Restaurants</h1>
          <CardSlick>
            {nearestRestaurantsData.map((restaurant, index) => (
              restaurant.image && (
                <div key={index} className="restaurant-slide">
                  <NavLink to={`/restaurant/${restaurant.restaurant_id}`} className="nav-link">
                    <Card
                      name={restaurant.restaurant_name}
                      image={restaurant.image}
                    />
                  </NavLink>
                </div>
              )
            ))}
          </CardSlick>
        </div>
      )}
    </main>
  );
};

export default NearRestau;
