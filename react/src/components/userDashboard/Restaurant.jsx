import { fetchRestaurantById } from '../../slices/restaurant/restaurantSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faPlus, faRemove} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../layouts/loader/loader';
import { deleteMenuCategoryThunk } from '../../slices/restaurant/menuCategory/deleteMenuCategorySlice';
import { deleteMenuItemThunk } from '../../slices/restaurant/menuItem/deleteMenuItemSlice';

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


  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);


  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }


  return (

    <section className="container-fluid">

      {restaurant ? (
        <div>

          <header>
            <h1 className='text-light'>{restaurant.name}</h1>
            <p className='text-light'>{restaurant.description}</p>
          </header>

          <h2 className='text-light'>Details</h2>

          <table className="table table-bordered">
            <tbody>

              <tr>
                <th>Logo</th>
                <td>{restaurant.logo ? <img className='col-1' src={restaurant.logo} alt="Logo" /> : 'N/A'}</td>
              </tr>

              <tr>
                <th>Cover</th>
                <td>{restaurant.cover ? <img className='col-1' src={restaurant.cover} alt="Cover" /> : 'N/A'}</td>
              </tr>

              <tr>
                <th>Name</th>
                <td>{restaurant.name}</td>
              </tr>

              <tr>
                <th>Slug</th>
                <td>{restaurant.slug}</td>
              </tr>

              <tr>
                <th>Title</th>
                <td>{restaurant.title}</td>
              </tr>

              <tr>
                <th>Summary</th>
                <td>{restaurant.summary}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>{restaurant.description}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>{restaurant.status}</td>
              </tr>

              <tr>
                <th>Actions</th>
                <td>
                  <Link to={`/user-dashboard/edit-restaurant/${restaurant.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                  </Link>
                </td>
              </tr>

            </tbody>

          </table>


          {restaurant.locations && restaurant.locations.length > 0 && (
            <div>
              <h2 className='text-light'>Locations</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Governorate</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Phone Number</th>
                    <th>Mobile Number</th>
                    <th>Hot Line</th>
                    <th>Opening Time</th>
                    <th>Closing Time</th>
                    <th>Closed Days</th>
                    <th>Number of Tables</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.locations.map((location) => (
                    <tr key={location.id}>
                      <td>{location.address}</td>
                      <td>{location.country ? location.country.name : 'N/A'}</td>
                      <td>{location.governorate ? location.governorate.name : 'N/A'}</td>
                      <td>{location.city ? location.city.name : 'N/A'}</td>
                      <td>{location.state ? location.state.name : 'N/A'}</td>
                      <td>{location.zip}</td>
                      <td>{location.latitude}</td>
                      <td>{location.longitude}</td>
                      <td>{location.phone_number}</td>
                      <td>{location.mobile_number}</td>
                      <td>{location.hot_line}</td>
                      <td>{location.opening_time}</td>
                      <td>{location.closed_time}</td>
                      <td>{location.closed_days}</td>
                      <td>{location.number_of_tables}</td>
                      <td>{location.status}</td>
                      <td>
                        <Link to={`/user-dashboard/edit-location/${location.id}`}>
                          <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {restaurant.categories && restaurant.categories.length > 0 && (
            <div>
              <h2 className='text-light'>Categories</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Cover</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.slug}</td>
                      <td>{category.cover ? <img src={category.cover} alt="Cover" width="100" /> : 'N/A'}</td>
                      <td>{category.description}</td>
                      <td>{category.status}</td>
                      <td>
                        <Link to={`/user-dashboard/edit-category/${category.id}`}>
                          <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {restaurant.menu_categories && restaurant.menu_categories.length > 0 && (
            <div>

              <h2 className='text-light'>
                Menu Categories
                <span>
                  <Link to={`/user-dashboard/add-category/${restaurantId}`}>
                         <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
                   </Link>
                </span>
              </h2>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                    
                    <th>Menu Items</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.menu_categories.map((menuCategory) => (
                    <tr key={menuCategory.id}>

                      <td>{menuCategory.name}</td>

                      <td>
                        <Link to={`/user-dashboard/edit-menu-category/${menuCategory.id}`}>
                          <FontAwesomeIcon icon={faEdit} className="text-success" />
                        </Link>

                        <FontAwesomeIcon 
                        icon={faRemove} 
                        onClick={() => handleDelete(menuCategory.id)} 
                        className="text-danger mx-5" 
                        />
                      </td>
                    
                      <td>
                        <table className="table table-bordered mt-2">
                          <thead>

                            <tr>
                              <th colSpan={3}>
                            <Link to={`/user-dashboard/add-item/${menuCategory.id}`}>
                              <FontAwesomeIcon icon={faPlus} className="text-success h5" />
                            </Link>
                              </th>
                            </tr>

                            <tr>
                              <th>Name</th>
                              <th>Slug</th>
                              <th>Description</th>
                              <th>Price</th>
                              <th>Sale Price</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>

                          </thead>
                          <tbody>
                            {menuCategory.menu_items.map((menuItem) => (
                              <tr key={menuItem.id}>
                                <td>{menuItem.name}</td>
                                <td>{menuItem.slug}</td>
                                <td>{menuItem.description}</td>
                                <td>{menuItem.price}</td>
                                <td>{menuItem.sale_price}</td>
                                <td>{menuItem.status}</td>
                                <td>
                                  <Link to={`/user-dashboard/edit-menu-item/${menuItem.id}`}>
                                    <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                                  </Link>
                         
                                  <FontAwesomeIcon 
                                  icon={faRemove} 
                                  onClick={() => handleDeleteItem(menuItem.id)} 
                                  className="text-danger mx-5" 
                                  />
                                  
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div>No restaurant data</div>
      )}
    </section>
  );
};

export default Restaurant;
