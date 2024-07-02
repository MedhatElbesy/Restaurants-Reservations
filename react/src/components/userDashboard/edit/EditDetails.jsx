import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRestaurantById, updateRestaurantAsync } from '../../../slices/restaurant/restaurantSlice';
import Loader from '../../../layouts/loader/loader';

const EditDetails = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const userId = useSelector((state) => state.auth.userId);
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const status = useSelector((state) => state.restaurant.status);
  const error = useSelector((state) => state.restaurant.error);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    title: '',
    summary: '',
    description: '',
    status: '', 
    logo: null,
    cover: null,
  });

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        slug: restaurant.slug,
        title: restaurant.title,
        summary: restaurant.summary,
        description: restaurant.description,
        status: restaurant.status,
        logo: null,
        cover: null,
      });
    }
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], 
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataForSubmission = new FormData();
    formDataForSubmission.append('user_id', userId);
    formDataForSubmission.append('name', formData.name);
    formDataForSubmission.append('slug', formData.slug);
    formDataForSubmission.append('title', formData.title);
    formDataForSubmission.append('summary', formData.summary);
    formDataForSubmission.append('description', formData.description);
    formDataForSubmission.append('status', capitalizeFirstLetter(formData.status)); 
    if (formData.logo) {
      formDataForSubmission.append('logo', formData.logo);
    }
    if (formData.cover) {
      formDataForSubmission.append('cover', formData.cover);
    }

    dispatch(updateRestaurantAsync({ restaurantId, formData: formDataForSubmission }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      });
  };


  if (status === 'loading') {
    return <Loader />;
  }


  if (status === 'failed') {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <main className="container">

      <section className='formUserDashboard'>

        <h2 className='text-light text-center my-4'>
          Edit Restaurant Details
        </h2>

        <form 
          onSubmit={handleSubmit} 
          className="text-light" 
          encType="multipart/form-data">
          
          <input
            type="hidden" 
            name="user_id" 
            value={userId} />

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="slug" className="form-label">
              Slug
            </label>
            <input
              type="text"
              className="form-control"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="summary" className="form-label">
              Summary
            </label>
            <textarea
              className="form-control"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              required>
            </textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required>
            </textarea>
          </div>

          <section className="mb-3">
            <label className="form-label">Status</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="active"
                  name="status"
                  value="Active"
                  checked={formData.status.toLowerCase() === 'active'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="active">
                  Active
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="inactive"
                  name="status"
                  value="InActive"
                  checked={formData.status.toLowerCase() === 'inactive'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inactive">
                  Inactive
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="deleted"
                  name="status"
                  value="Deleted"
                  checked={formData.status.toLowerCase() === 'deleted'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="deleted">
                  Deleted
                </label>
              </div>
            </div>
          </section>

          <div className="mb-3">
            <label htmlFor="logo" className="form-label">
              Logo
            </label>
            <input
              type="file"
              className="form-control"
              id="logo"
              name="logo"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cover" className="form-label">
              Cover
            </label>
            <input
              type="file"
              className="form-control"
              id="cover"
              name="cover"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary col-12">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
};

export default EditDetails;
