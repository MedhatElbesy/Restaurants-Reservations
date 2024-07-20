import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import '../userDashboardRestaurant.css';
import Loader from '../../../layouts/loader/loader';
import { Spinner } from 'react-bootstrap';

export default function DetailsTable() {
  const { restaurant } = useOutletContext();
  const status = restaurant ? 'succeeded' : 'loading';

  if (status === 'loading') {
    return (
      <main className="centered-flex">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="container-fluid restaurant-dashboards mx-5">

      <section className="custom-header">

        <h3 className="text-center">Restaurant Details</h3>

        <div className="roof"></div>

        <section 
         className="float-end my-4" 
         style={{ zIndex: 10, position: 'relative' }}
        >
          <Link  
           to={`/edit-restaurant/${restaurant.id}`}  
           className="btn btn-outline-primary"
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Link>
        </section>

      </section>

      <section className="restaurant-details position-relative">

        <table className="table my-4 table-bordered">

          <tbody>

            <tr>
              <th>Cover</th>
              <td><img 
                  src={restaurant.cover} 
                  alt={`${restaurant.name} cover`} 
                  style={{ height: '25vh' }} 
                  className="img-fluid" />
              </td>
            </tr>

            <tr>
              <th>Name</th>
              <td>{restaurant.name}</td>
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
              <th>Hotline</th>
              <td>{restaurant.hot_line}</td>
            </tr>

          </tbody>

        </table>

      </section>
      
    </main>
  );
}
