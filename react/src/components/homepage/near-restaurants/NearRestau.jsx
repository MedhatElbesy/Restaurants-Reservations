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
  console.log(nearestRestaurantsData);

  useEffect(() => {
   
      dispatch(fetchUserDataById(userId)).then(() => {
        if (userData && userData.addresses && userData.addresses.length > 0) {
          dispatch(fetchNearestRestaurants(userId));
        }
      });
    
  }, [ ]);


  if (status === 'loading') {
    return <Loader/>;
  }

  return (
    <main className="restau">
      {nearestRestaurantsData.length > 0 && (
        <>
          <h1 className="text-center col-8 offset-2 custom-color my-5 text-sec sec-font">
            Nearest Restaurants
          </h1>
          <CardSlick>
            {nearestRestaurantsData.map((restaurant, index) => (
              <div key={index} className="restaurant-slide">
                <NavLink to={`/restaurant/${restaurant.restaurant_id}`}>
                  <Card
                    name={restaurant.restaurant_name}
                    image={restaurant.image}
                  />
                </NavLink>
              </div>
            ))}
          </CardSlick>
        </>
      )}
    </main>
  );
};

export default NearRestau;
