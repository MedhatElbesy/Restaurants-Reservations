import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategoryByIdAsync, fetchAllCategoryAsync, updateCategoryAsync } from '../../../slices/restaurant/restaurantCategory/restaurantCategory';
import { Form, Button, Alert } from 'react-bootstrap';

const EditRestaurantCategory = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams(); 
  const { category, categories, status, error } = useSelector(state => state.restaurantCategory);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category_id: '',
    status: '',
  });

  useEffect(() => {
    dispatch(fetchCategoryByIdAsync(categoryId));
    dispatch(fetchAllCategoryAsync());
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setFormData({
        category_id: category.id,
        status: category.status,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForSubmission = {
      category_id: parseInt(formData.category_id), 
      restaurant_id: category.restaurant_id,
      status: formData.status,
    };

    dispatch(updateCategoryAsync({ categoryId, data: dataForSubmission }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };

  if (status === 'failed') {
    return (
      <Alert variant="danger">
      <p> Failed to update category. Please try again later.</p>
      </Alert>
    );
  }

  return (
  <main>
    <section className='formUserDashboard'>

      <h2 className='text-light text-center my-4'>Update Category</h2>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Select Category:</Form.Label>
          <Form.Select 
           name="category_id" 
           required
           value={formData.category_id} 
           onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="mb-3">
          <Form.Label>Status:</Form.Label><br />
          <Form.Check
            type="radio"
            id="enabled"
            name="status"
            label="Enabled"
            value="enabled"
            checked={formData.status === 'enabled'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="disabled"
            name="status"
            label="Disabled"
            value="disabled"
            checked={formData.status === 'disabled'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="deleted"
            name="status"
            label="Deleted"
            value="deleted"
            checked={formData.status === 'deleted'}
            onChange={handleChange}
          />
        </div>

        <Button variant="warning my-3 col-12" type="submit">
          Update Category
        </Button>

      </Form>
      </section>
    </main>
  );
};

export default EditRestaurantCategory;
