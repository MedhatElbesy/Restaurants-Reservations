import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LocationsTable = ({ restaurant, handleDeleteLocation }) => {
  return (
    <section className='restaurant-details my-5 container-fluid'>

      <section
      className='row'>
      <h2 className='text-light text-center col-12'>Locations
        <span>
          <Link to={`/user-dashboard/add-location/${restaurant.id}`}>
            <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
          </Link>
        </span>
      </h2>
      </section>

    <section className='row'>
      <table className="locations">
        <tbody>
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
            <th>Opening Time</th>
            <th>Closing Time</th>
            <th>Closed Days</th>
            <th>N.of Tables</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </tbody>
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
              <td>{location.opening_time}</td>
              <td>{location.closed_time}</td>
              <td>{location.closed_days}</td>
              <td>{location.number_of_tables}</td>
              <td>{location.status}</td>
              <td>
                <Link to={`/user-dashboard/edit-location/${location.id}`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDeleteLocation(location.id)}
                  className="text-danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      
    </section>
  );
};

export default LocationsTable;
