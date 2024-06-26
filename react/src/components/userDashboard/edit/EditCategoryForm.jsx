import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryByIdAsync, updateCategoryAsync } from '../../../slices/restaurant/category/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../../layouts/loader/loader';

const EditCategoryForm = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, status, error } = useSelector(state => state.category);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    cover: null,
    description: '',
    status: 'Enabled',
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryByIdAsync(categoryId));
    }
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        cover: null, 
        description: category.description,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      cover: file,
    }));
  };

  const capitalizeStatus = (statusValue) => {
    return statusValue.charAt(0).toUpperCase() + statusValue.slice(1).toLowerCase();
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataForSubmission = new FormData();
    formDataForSubmission.append('name', formData.name);
    formDataForSubmission.append('slug', formData.slug);
    formDataForSubmission.append('description', formData.description);
    formDataForSubmission.append('status', capitalizeStatus(formData.status));

    if (formData.cover) {
      formDataForSubmission.append('cover', formData.cover);
    }

    dispatch(updateCategoryAsync({ categoryId, formData: formDataForSubmission }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };


  if (status === 'loading' || !category) {
    return (
      <Loader></Loader>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="danger">
       <p>Failed to load category. Please try again later</p>
      </Alert>
    );
  }

  return (
    <main>

      <section className='formUserDashboard'>

        <h2 className='text-light text-center my-4'>Edit Category</h2>
 
        <Form onSubmit={handleSubmit}>

          <div className="mb-3">
           <Form.Label htmlFor="name">Name:</Form.Label>
           <Form.Control
            type="text"
            id="name"
            name="name"
            value={formData.name} 
            onChange={handleChange} />
          </div>

         <div className="mb-3">
           <Form.Control 
           type="hidden"  
           name="slug" 
           value={formData.slug} 
           onChange={handleChange} />
         </div>

        <div className="mb-3">
          <Form.Label htmlFor="cover">Cover:</Form.Label>
          <Form.Control 
          type="file" 
          id="cover" 
          name="cover" 
          onChange={handleFileChange} />
          {category.cover && 
          <p className="text-muted">Current Cover: {category.cover}</p>}
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control 
          as="textarea" 
          id="description" 
          rows={3} name="description" 
          value={formData.description} 
          onChange={handleChange} />
        </div>

        <div className="mb-3">
          <Form.Label>Status:</Form.Label><br />
          <Form.Check
            type="radio"
            id="enabled"
            name="status"
            label="Enabled"
            value="Enabled"
            checked={formData.status === 'enabled'}
            onChange={handleChange}
          />

          <Form.Check
            type="radio"
            id="disabled"
            name="status"
            label="Disabled"
            value="Disabled"
            checked={formData.status === 'disabled'}
            onChange={handleChange}
          />

        </div>

        <Button 
        variant="primary"
        type="submit">
          Update Category
        </Button>

      </Form>
      </section>

    </main>
  );
};

export default EditCategoryForm;
