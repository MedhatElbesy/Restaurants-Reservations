import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const DetailsTable = ({ restaurant }) => {
  return (
    <section className="restaurant-details my-5">

      <h2 className="text-center my-5">Details</h2>
      
      <table className="custom-table locations w-100">
        <tbody>
          <tr>
            <th>Logo</th>
            <td>{restaurant.logo ? <img src={restaurant.logo} alt="Logo" className="image" /> : 'N/A'}</td>
          </tr>
          <tr>
            <th>Cover</th>
            <td>{restaurant.cover ? <img src={restaurant.cover} alt="Cover" className="image" /> : 'N/A'}</td>
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
            <th>Hot Line</th>
            <td>{restaurant.hot_line}</td>
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
    </section>
  );
};

export default DetailsTable;
