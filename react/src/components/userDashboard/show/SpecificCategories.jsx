import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificCategoryAsync, deleteCategoryAsync } from '../../../slices/restaurant/category/categorySlice';

const SpecificCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);
  const status = useSelector((state) => state.category.status);

  useEffect(() => {
    dispatch(fetchSpecificCategoryAsync());
  }, []);

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategoryAsync(categoryId));
  };

 
  const filteredCategories = Array.isArray(categories) ? categories.filter(category => category.status !== 'deleted') : [];

  return (
    <section className='restaurant-details row my-5'>

      <h2 className='text-light text-center'>
        Your Special Categories
        <span>
          <Link to={`/user-dashboard/add-special-category`}>
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
          {status === 'failed' ? (
            <tr>
              <td colSpan="5">Error occur</td>
            </tr>
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.cover}</td>
                <td>{category.description}</td>
                <td>{category.status}</td>
                <td>
                  <Link to={`/user-dashboard/edit-category/${category.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="text-success" />
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-danger mx-5"
                    onClick={() => handleDeleteCategory(category.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </section>
  );
};

export default SpecificCategories;
