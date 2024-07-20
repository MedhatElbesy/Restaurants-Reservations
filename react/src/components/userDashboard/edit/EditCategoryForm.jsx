import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryByIdAsync, updateCategoryAsync } from '../../../slices/restaurant/category/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Loader from '../../../layouts/loader/loader';
import Swal from 'sweetalert2';

const EditCategoryForm = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, status, error } = useSelector(state => state.category);

  const [formData, setFormData] = useState({
    name: '',
    cover: null,
    description: '',
    status: 'Enabled',
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryByIdAsync(categoryId));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
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
    if (file.size > 2 * 1024 * 1024) {
      alert('Please choose an image file smaller than 2MB.');
      return;
    }
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
    formDataForSubmission.append('description', formData.description);
    formDataForSubmission.append('status', capitalizeStatus(formData.status));

    if (formData.cover) {
      formDataForSubmission.append('cover', formData.cover);
    }

    dispatch(updateCategoryAsync({ categoryId, formData: formDataForSubmission }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          Swal.fire({
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: true,
            timer: 9000,
          }).then((result) => {
              navigate(-1); 
          });
        }
      });
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (!category) {
    return (
      <main className='my-2'>
        <section className=' col-6 offset-3'>
          <Alert variant="danger">
            <p>Failed to load category. Please try again later</p>
          </Alert>
        </section>
      </main>
    );
  }

  return (
    <main >
      <section className=' col-6  category offset-3'>
        <h2 className='text-center'>Edit Category</h2>

        {status === 'failed' && (
          <Alert variant="danger">
            <p>Failed to load category. Please try again later</p>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              id="name"
              className='text-dark'
              name="name"
              value={formData.name} 
              onChange={handleChange} />
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="cover">Cover:</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*"
              id="cover" 
              name="cover" 
              onChange={handleFileChange} />
            {category.cover && 
              <p className="">Current Cover: {category.cover}</p>}
          </div>

          <div className="mb-3">
            <Form.Label htmlFor="description">Description:</Form.Label>
            <Form.Control 
              as="textarea" 
              className='text-dark'
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

          <button 
            type="submit"
            className='custom-button col-12 my-3'>
            Update Category
          </button>
        </Form>
      </section>
    </main>
  );
};

export default EditCategoryForm;
