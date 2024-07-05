import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchRestaurantCategoryAsync, deleteCategoryAsync } from '../../../slices/restaurant/restaurantCategory/restaurantCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const RestaurantCategory = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { restaurantCategory, error, status } = useSelector((state) => state.restaurantCategory);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantCategoryAsync(restaurantId));
    }
  }, [ restaurantId]);

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAsync(categoryId))
          .then(() => {
            dispatch(fetchRestaurantCategoryAsync(restaurantId));
            Swal.fire(
              'Deleted!',
              'Your category has been deleted.',
              'success'
            );
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your category is safe :)',
          'error'
        );
      }
    });
  };

  return (
    <main>

      <section className='container location-container my-5'>

        <h2 className='text-center mb-4'>
          Restaurant Categories
          <Link to={`/add-restaurant-category/${restaurantId}`} className="float-end">
            <FontAwesomeIcon icon={faPlus} className="text-warning mx-3 h2" />
          </Link>
        </h2>

        {status === 'loading' && (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        )}

        
        {restaurantCategory && restaurantCategory.length > 0 && (
          <section className="row row-cols-1 row-cols-md-3 g-4">

            {restaurantCategory.map((item) => (
              <div key={item.id} className="col">

                <div className="h-100 card-color">

                  <Card.Body>

                    <Card.Title className=" text-center">
                      {item.category.name}
                    </Card.Title>

                    <div className="text-center my-2">

                      <Link to={`/edit-restaurant-category/${item.id}`}>
                        <FontAwesomeIcon icon={faEdit}  className="text-primary me-3" />
                      </Link>
                      
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        onClick={() => handleDeleteCategory(item.id)}
                        style={{ cursor: 'pointer' }}
                      />

                    </div>

                  </Card.Body>
                </div>
              </div>
            ))}
          </section>
        )}

        {restaurantCategory && restaurantCategory.length === 0 && (
          <p className="text-center mt-4">No categories found.</p>
        )}
      </section>
    </main>
  );
};

export default RestaurantCategory;
