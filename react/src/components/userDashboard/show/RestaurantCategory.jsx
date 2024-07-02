import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchRestaurantCategoryAsync } from '../../../slices/restaurant/restaurantCategory/restaurantCategory'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const RestaurantCategory = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { restaurantCategory, error } = useSelector((state) => state.restaurantCategory);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantCategoryAsync(restaurantId));
    }
  }, [restaurantId]);

  return (
    <main>

    <section className='restaurant-details row my-5'>

      <Link to={`/user-dashboard/add-restaurant-category/${restaurantId}`}>
       <FontAwesomeIcon icon={faPlus} className="text-warning my-3 mx-3 h2" />
      </Link>
      
      <h1 className='text-center text-light'>
        Restaurant Categories
      </h1>
      
      {restaurantCategory && restaurantCategory.length > 0 ? (
        <table className="locations my-4">
          <thead className='text-center'>
            <tr>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {restaurantCategory.map((item) => (
              <tr key={item.id}>
                <td className='text-dark'>{item.category.name}</td>
                <td>
                <Link to={`/user-dashboard/edit-restaurant-category/${item.id}`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found.</p>
      )}
    
      </section>
    </main>
  );
};

export default RestaurantCategory;
