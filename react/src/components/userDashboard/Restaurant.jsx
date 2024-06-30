import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../layouts/loader/loader';
import { fetchRestaurantById } from '../../slices/restaurant/restaurantSlice';
import { deleteMenuCategoryThunk } from '../../slices/restaurant/menuCategory/deleteMenuCategorySlice';
import { deleteMenuItemThunk } from '../../slices/restaurant/menuItem/deleteMenuItemSlice';
import { deleteLocationAsync } from '../../slices/restaurant/location/deleteSlice';
import DetailsTable from './show/DetailsTable';
import LocationsTable from './show/LocationsTable';
import LocationTablesTable from './show/LocationTablesTable';
import CategoriesTable from './show/CategoriesTable';
import MenuCategoriesTable from './show/MenuCategoriesTable';
import './Restaurant.css';
import Sidebar from '../../layouts/Sidebar';
import SpecificCategories from './show/SpecificCategories';

const Restaurant = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const status = useSelector((state) => state.restaurant.status);
  const error = useSelector((state) => state.restaurant.error);

  const handleDelete = (menuCategoryId) => {
    dispatch(deleteMenuCategoryThunk(menuCategoryId));
  };

  const handleDeleteItem = (menuItemId) => {
    dispatch(deleteMenuItemThunk(menuItemId));
  };

  const handleDeleteLocation = (locationId) => {
    dispatch(deleteLocationAsync(locationId));
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>An error occur</div>;
  }

  return (
    <div className="restaurant-container row">

      <Sidebar />

      <main className="container-fluid restaurant col-10 offset-2">

        <section className="restaurant-cover">

          <img className="restaurant-cover-img" src="/images/1 (1).jpg" alt="Cover" />

          <div className="restaurant-overlay">
            
            <header className='restaurant-header'>
              {restaurant && (
                <>
                  <h1 className='display-1'>{restaurant.name}</h1>
                  <p className='text-light'>{restaurant.description}</p>
                  <h4>Check now your dashboard</h4>
                </>
              )}
            </header>


          </div>

        </section>

        {restaurant ? (
          <div className="restaurant-content">

            <section id="details">
              <DetailsTable restaurant={restaurant} />
            </section>

            <section id="specific-category">
              <SpecificCategories/>
            </section>

            <section id="locations">
              <LocationsTable restaurant={restaurant} handleDeleteLocation={handleDeleteLocation} />
            </section>

            <section id="location-tables">
              <LocationTablesTable restaurant={restaurant} />
            </section>

            <section id="categories">
              <CategoriesTable restaurant={restaurant} />
            </section>

            <section id="menu-categories">
              <MenuCategoriesTable 
                restaurant={restaurant} 
                handleDelete={handleDelete} 
                handleDeleteItem={handleDeleteItem} 
              />
            </section>

          </div>
        ) : (
          <div>No restaurant data</div>
        )}
      </main>
      
    </div>
  );
};

export default Restaurant;
