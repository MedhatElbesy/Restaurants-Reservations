import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchRestaurantById } from '../../slices/restaurant/restaurantSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../layouts/loader/loader';


const Restaurant = () => {

  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const status = useSelector((state) => state.restaurant.status);
  const error = useSelector((state) => state.restaurant.error);

  useEffect(() => {

    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);

  if (status === 'loading') {
    return <Loader></Loader>;
  }

  if (status === 'failed') {
    return <div>Error: {errorMessage}</div>;
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
                <td>
                    {restaurant.logo ? (
                  <img className='col-1' src={restaurant.logo} alt="Logo" />
                    ) : ('N/A')}
                 </td>

              </tr>

              <tr>
                <th>Cover</th>
                 <td>
                  {restaurant.cover ?
                   <img className='col-1'
                    src={restaurant.cover}
                    alt="Cover" /> : 'N/A'}
                </td>
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
                  <Link to={`/edit-restaurant/${restaurant.id}`}>
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
                      <td>{location.country || 'N/A'}</td>
                      <td>{location.governorate || 'N/A'}</td>
                      <td>{location.city || 'N/A'}</td>
                      <td>{location.state || 'N/A'}</td>
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
                        <Link to={`/edit-location/${location.id}`}>
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
                        <Link to={`/edit-category/${category.id}`}>
                          <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                        </Link>
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
