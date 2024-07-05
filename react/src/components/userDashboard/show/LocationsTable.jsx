import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRestaurantContext } from '../RestaurantContext';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocationAsync, selectDeleteStatus } from '../../../slices/restaurant/location/deleteSlice';
import { fetchRestaurantById } from '../../../slices/restaurant/restaurantSlice'; 
import Loader from '../../../layouts/loader/loader';

const LocationsTable = () => {
  const dispatch = useDispatch();
  const { restaurant } = useRestaurantContext(); 
  const deleteStatus = useSelector(selectDeleteStatus);

  const handleDeleteLocation = (locationId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this location!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLocationAsync(locationId))
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id)); 
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the location.',
              'error'
            );
          });
      }
    });
  };

  

  if (!restaurant || !restaurant.locations) {
    return <Loader/>; 
  }

  return (
    <section className="location-container my-5 container">

      <section className="row">
        <h2 className="text-center col-12">
          Locations
          <span>
            <Link to={`/add-location/${restaurant.id}`}>
              <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
            </Link>
          </span>
        </h2>
      </section>

      <section className="row">

        {restaurant.locations.map((location) => (
          <div key={location.id} className="col-md-5 mx-5 mb-4 my-5">

            <div className="card">
              <header className="card-header my-card-header">
                <h5 className="card-title">{location.address}</h5>
              </header>

              <div className="card-body my-card-body">
                
                <p><strong>Country:</strong> 
                {location.country ? location.country.name : 'N/A'}
                </p>

                <p><strong>Governorate:</strong> 
                {location.governorate ? location.governorate.name : 'N/A'}
                </p>

                <p><strong>City:</strong> 
                {location.city ? location.city.name : 'N/A'}
                </p>

                <p><strong>State:</strong> 
                {location.state ? location.state.name : 'N/A'}
                </p>

                <p><strong>Zip:</strong> 
                {location.zip}
                </p>

                <p><strong>Latitude:</strong> 
                {location.latitude}
                </p>

                <p><strong>Longitude:</strong> 
                {location.longitude}
                </p>

                <p><strong>Phone Number:</strong> 
                {location.phone_number}
                </p>

                <p><strong>Mobile Number:</strong> 
                {location.mobile_number}
                </p>

                <p><strong>Opening Time:</strong> 
                {location.opening_time}
                </p>

                <p><strong>Closing Time:</strong> 
                {location.closed_time}
                </p>

                <p><strong>Closed Days:</strong> 
                {location.closed_days}
                </p>

                <p><strong>Number of Tables:</strong> 
                {location.number_of_tables}
                </p>

                <p><strong>Status:</strong> 
                {location.status}
                </p>

                <section className="text-end">
                  <Link to={`/edit-location/${location.id}`} className="text-primary me-3">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteLocation(location.id)}
                    className="text-danger"
                  />
                </section>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default LocationsTable;
