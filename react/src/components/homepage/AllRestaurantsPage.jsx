import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchRestaurants } from '../../slices/adminDashboard/adminSlice';
import Loader from '../../layouts/loader/loader';
import { fetchAllCategoryAsync } from '../../slices/restaurant/restaurantCategory/restaurantCategory';
import { fetchRestaurantByCategoryAsync } from '../../slices/fetchRestaurantByCategory';

const AllRestaurantsPage = () => {
  
  const dispatch = useDispatch();
  const { restaurants, status: restaurantStatus } = useSelector(state => state.adminDashboard);
  const { categories, status: categoryStatus } = useSelector(state => state.restaurantCategory);
  const { data: categoryRestaurants, loading: categoryLoading } = useSelector(state => state.restaurantsCategoryData);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchAllCategoryAsync());
  }, []);


  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    if (categoryName) {
      if (categoryName === 'All') {
        dispatch(fetchRestaurants());
      } else {
        dispatch(fetchRestaurantByCategoryAsync(categoryName));
      }
    }
  };

  if (restaurantStatus === 'loading' || categoryStatus === 'loading' || categoryLoading) {
    return <Loader />;
  }

  const displayedRestaurants = selectedCategory && selectedCategory !== 'All' ? categoryRestaurants : restaurants;

  return (
    <main className='restau container-fluid'>

      {displayedRestaurants && displayedRestaurants.length > 0 && (
        <>
          <section className='d-flex justify-content-between align-items-center mx-4'>

            <h1 className='col-10'>Discover Our Restaurants</h1>

            <aside className='col-2 d-flex justify-content-end'>

              <select
                className='form-select border border-orange text-orange'
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value=''>Show by Category</option>
                <option value='All'>All</option>
                {categories && categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

            </aside>

          </section>

          <section className='list'>

            {displayedRestaurants.map((restaurant) => (
              <NavLink 
               key={restaurant.id} 
               to={`/restaurant/${restaurant.id}`} 
               className="item d-flex my-4"
              >

                <div className="image-container">
                  <img
                    src={restaurant.cover}
                    alt={restaurant.name}
                    className="image"
                  />
                </div>

                <section className="details mx-3">

                  <h2>{restaurant.name}</h2>

                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={i < restaurant.average_rating ? 'text-warning' : 'text-secondary'}
                      />
                    ))}
                  </div>

                  <p>{restaurant.description}</p>
                  
                  <div className="locations">
                    <h6>Branches:</h6>
                    <ul className="d-flex flex-wrap">
                      {restaurant.location_addresses && restaurant.location_addresses.map((location, index) => (
                        <li key={index} className="location-item p-2 m-1">
                          {location.address}
                        </li>
                      ))}
                    </ul>
                  </div>

                </section>
                
              </NavLink>
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default AllRestaurantsPage;

