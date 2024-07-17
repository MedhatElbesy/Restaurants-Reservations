import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import Loader from '../../../layouts/loader/loader';
import { NavLink } from 'react-router-dom';
import { fetchRestaurants } from '../../../slices/adminDashboard/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
          <section className='d-flex justify-content-between align-items-center mx-1'>

            <h1 className='col-10'>Discover Our Restaurants</h1>

            <NavLink 
             to="all-restaurants" 
             className="nav-link text-primary" 
             style={{ textDecoration: 'none' }}
            >
              View All

              <FontAwesomeIcon 
               icon={faArrowRight} 
               className='text-primary mx-1'>
               </FontAwesomeIcon>
            </NavLink>

          </section>

          <CardSlick>

            {restaurants.map((restaurant, index) => (
              <div 
               key={index} 
               className="restaurant-slide">
                <NavLink 
                 to={`/restaurant/${restaurant.id}`} 
                 className="nav-link" 
                 style={{ textDecoration: 'none' }}>
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
