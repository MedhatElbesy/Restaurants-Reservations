import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificCategoryAsync, deleteCategoryAsync } from '../../../slices/restaurant/category/categorySlice';
import { Card, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const SpecificCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const status = useSelector((state) => state.category.status);

  useEffect(() => {
    dispatch(fetchSpecificCategoryAsync());
  }, []);

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAsync(categoryId))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting category:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the category.',
              'error'
            );
          });
      }
    });
  };

  const filteredCategories = Array.isArray(categories) ? categories.filter(category => category.status !== 'deleted') : [];

  return (
    <section className='container location-container my-5'>

      <h2 className='text-center mb-4'>
        Your Special Categories
        <Link to={`/add-special-category`} className="float-end">
          <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
        </Link>
      </h2>

      {status === 'loading' && filteredCategories.length === 0 && (
        <div className="text-center">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      )}

      {filteredCategories.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {filteredCategories.map((category) => (
            <div key={category.id} className="col">

              <Card className="specific-card h-100">

                {category.cover && (
                  <Card.Img variant="top" src={category.cover} alt={category.name} />
                )}

                <Card.Body>

                  <Card.Title>{category.name}</Card.Title>

                  <Card.Text>
                    <strong>Description:</strong> {category.description}<br />
                    <strong>Status:</strong> {category.status}
                  </Card.Text>

                  <div className="d-flex justify-content-end mt-auto">

                    <Link to={`/edit-category/${category.id}`} className="text-success me-3">
                      <FontAwesomeIcon icon={faEdit} className="text-success" />
                    </Link>

                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger"
                      onClick={() => handleDeleteCategory(category.id)}
                    />

                  </div>

                </Card.Body>

              </Card>

            </div>
          ))}
        </div>
      ) : (
        <p>..............</p>
      )}
    </section>
  );
};

export default SpecificCategories;
