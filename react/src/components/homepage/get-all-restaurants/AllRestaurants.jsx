import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import Loader from '../../../layouts/loader/loader';
import { Link, NavLink } from 'react-router-dom';
import { fetchRestaurants } from '../../../slices/adminDashboard/adminSlice';


const AllRestaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, status } = useSelector(state => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, []);

  if (status === 'loading') {
    return <Loader />;
  }


  return (
    <main className='restau'>
      {restaurants.length > 0 && (
        <>
          <h1 className='text-center  col-10 offset-1 text-sec custom-color my-5 sec-font'>Elegant Dining Venue</h1>
          <CardSlick>
            {restaurants.map((restaurant, index) => (
              <div key={index} className="restaurant-slide">
                <NavLink to={`/restaurant/${restaurant.id}`}>
                  <Card
                    name={restaurant.name}
                    image={restaurant.cover_url}
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

export default AllRestaurants;
