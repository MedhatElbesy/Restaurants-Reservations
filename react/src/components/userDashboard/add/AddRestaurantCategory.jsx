import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCategoryAsync, fetchAllCategoryAsync } from '../../../slices/restaurant/restaurantCategory/restaurantCategory';
import { Form, Button, Alert } from 'react-bootstrap';


const AddRestaurantCategory = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(state => state.restaurantCategory);
  const { restaurantId } = useParams(); 

  const [formData, setFormData] = useState({
    category_id: '',
    status: 'enabled',
  });


  useEffect(() => {
    dispatch(fetchAllCategoryAsync());
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataForSubmission = new FormData();
    formDataForSubmission.append('category_id', formData.category_id);
    formDataForSubmission.append('restaurant_id', restaurantId); 
    formDataForSubmission.append('status', formData.status);

    dispatch(addCategoryAsync(formDataForSubmission));
  };

  if (status === 'failed') {
    return (
      <Alert variant="danger">
       <p>Failed to add category. Please try again later.</p>
      </Alert>
    );
  }

  return (
    <main>
      <h2>Add Category</h2>

      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3">
          <Form.Label>Category:</Form.Label>
          <Form.Select name="category_id" value={formData.category_id} onChange={handleChange}>
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
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="disabled"
            name="status"
            label="Disabled"
            value="disabled"
            onChange={handleChange}
          />
           <Form.Check
            type="radio"
            id="deleted"
            name="status"
            label="Deleted"
            value="deleted"
            onChange={handleChange}
          />
        </div>

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </main>
  );
};

export default AddRestaurantCategory;
