import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';
import { fetchRestaurantById } from '../../../slices/restaurant/restaurantSlice';
import { useRestaurant } from '../RestaurantContext';

const CategoriesTable = () => {

  const { restaurantId, restaurant, status, error } = useRestaurant();

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);


  if (status === 'loading') {
    return <Loader />;
  }


  if (status === 'failed') {
    return <div>An error occurred: {error}</div>;
  }


  return (
    <section className='restaurant-details row my-5'>

      <h2 className='text-light text-center'>
         Restaurant Categories
      <span>
          <Link to={`/user-dashboard/add-restaurant-category/${restaurant.id}`}>
            <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
          </Link>
        </span>
      </h2>

      <table className="locations my-2">

        <thead>
          <tr>
            <th>Name</th>
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
              <td>{category.cover ? <img src={category.cover} alt="Cover" width="100" /> : 'N/A'}</td>
              <td>{category.description}</td>
              <td>{category.status}</td>
              <td>
                <Link to={`/user-dashboard/edit-restaurant-category/${category.id}`}>
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
  );
};

export default CategoriesTable;
