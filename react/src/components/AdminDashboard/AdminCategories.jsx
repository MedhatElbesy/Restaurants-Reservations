import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Loader from '../../layouts/loader/loader';
import { fetchAllCategoryAsync } from '../../slices/restaurant/restaurantCategory/restaurantCategory';
import { deleteCategoryAsync } from '../../slices/restaurant/category/categorySlice';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.restaurantCategory);

  useEffect(() => {
    dispatch(fetchAllCategoryAsync());
  }, [dispatch]);

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
            dispatch(fetchAllCategoryAsync());
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

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error?.message || JSON.stringify(error)}</div>;
  }

  return (
    <main className="container admin">
      <h1 className="text-center  mb-4 my-5">
        Categories
        <Link to={`/add-special-category`} className="float-end">
          <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
        </Link>
      </h1>
      <table className="my-5 col-12 location-container">
        <thead>
          <tr className="text-center my-5">
            <th>Name</th>
            <th>Cover</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.id} className="text-center my-5">
                <td>{cat.name}</td>
                <td>{cat.cover ? <img src={cat.cover} alt="Cover" width="100" /> : 'N/A'}</td>
                <td>{cat.description}</td>
                <td>{cat.status}</td>
                <td>
                  <Link to={`/edit-category/${cat.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-danger"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">........</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
