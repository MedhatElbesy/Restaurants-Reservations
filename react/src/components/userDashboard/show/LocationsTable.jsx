import React from 'react';
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
    <main className="location-container my-5 container">

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

          <div key={location.id} className="col-md-5 col-10 mx-5 my-5 location-container">

            <header className="location-header">
              <h5 className="location-title">{location.address}</h5>
            </header>

            <div className="location-body">

              <section className="detail-row">

                <div className="detail-item  text-light col-6">
                  <strong className='table-font' >Country:</strong> 
                  {location.country ? location.country.name : 'N/A'}
                </div>

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>Governorate:</strong> 
                  {location.governorate ? location.governorate.name : 'N/A'}
                </div>

              </section>

              <section className="detail-row">

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>City:</strong> 
                  {location.city ? location.city.name : 'N/A'}
                </div>

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>State:</strong> 
                  {location.state ? location.state.name : 'N/A'}
                </div>

              </section>

              <section className="detail-row">

              <div className="detail-item text-light col-6">
                  <strong className='table-font'>Number of Tables:</strong> 
                  {location.number_of_tables}
                </div>

                <div className="detail-item text-light col-6">
                  <strong   className='table-font'>Status:</strong> 
                  {location.status}
                </div>

              </section>

              <section className="detail-row">

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>Phone Number:</strong> 
                  {location.phone_number}
                </div>

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>Mobile Number:</strong> 
                  {location.mobile_number}
                </div>

              </section>

              <section className="detail-row">

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>Opening Time:</strong> 
                  {location.opening_time}
                </div>

                <div className="detail-item text-light col-6">
                  <strong className='table-font'>Closing Time:</strong> 
                  {location.closed_time}
                </div>

              </section>

              <section className="detail-row">

                <div className="detail-item col-6 text-light">
                  <strong className='table-font'>Closed Days:</strong> 
                  {location.closed_days}
                </div>

              </section>

            </div>

            <section className="location-actions">
              <Link to={`/edit-location/${location.id}`} >
                <FontAwesomeIcon icon={faEdit}  className='text-primary'/>
              </Link>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeleteLocation(location.id)}
                className="text-danger"
              />
            </section>

          </div>
        ))}
      </section>

    </main>
  );
};

export default LocationsTable;
