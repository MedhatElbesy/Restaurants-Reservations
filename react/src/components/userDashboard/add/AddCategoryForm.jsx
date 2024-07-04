import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAsync } from '../../../slices/restaurant/category/categorySlice';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.category);
  const navigate = useNavigate();
  const userId = useSelector(state => state.auth.userId);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    cover: null,
    description: '',
    status: 'Enabled',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setErrorMessage('Category already exists. Please choose a different name.');
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
    formDataForSubmission.append('user_id', userId);

    if (formData.cover) {
      formDataForSubmission.append('cover', formData.cover);
    }

    dispatch(addCategoryAsync(formDataForSubmission))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      });
  };

  return (
    <main>

      <section className='formUserDashboard'>

        <h2 className='text-center my-5'>Add Category</h2>

        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <div className="mb-3">
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange} />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="slug">Slug:</Form.Label>
            <Form.Control
              type="text"
              required
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange} />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="cover">Cover:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              required
              id="cover"
              name="cover"
              onChange={handleFileChange} />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="description">Description:</Form.Label>
            <Form.Control
              as="textarea"
              required
              id="description"
              rows={3}
              name="description"
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
              checked={formData.status === 'Enabled'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="disabled"
              name="status"
              label="Disabled"
              value="Disabled"
              checked={formData.status === 'Disabled'}
              onChange={handleChange}
            />
          </div>

          <Button className='col-12' variant="warning" type="submit">
            Add Category
          </Button>

        </Form>

      </section>

    </main>
  );
};

export default AddCategoryForm;
