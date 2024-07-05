import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addMenuCategoryThunk } from '../../../slices/restaurant/menuCategory/addMenuCategory';

const AddMenuCategory = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'Enabled',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMenuCategoryThunk({ ...formData, restaurant_id: restaurantId }))
      .unwrap()
      .then(() => {
        navigate(-1); 
      })
      .catch((error) => {
        console.error('Failed to add menu item:', error);
      });
  };


  return (
    
  <main className="container">

    <section className='formUserDashboard'>

      <h2 className=' text-center my-5'>Add Menu Category</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="slug" className="form-label">Slug</label>
          <input 
          type="text" 
          className="form-control" 
          id="slug" 
          name="slug" 
          value={formData.slug} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
          className="form-control" 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select 
          className="form-control" 
          id="status" 
          name="status" 
          value={formData.status} 
          onChange={handleChange} 
          required>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>

        <button type="submit" className="btn my-4 btn-warning col-12">Add Menu Category</button>
      </form>
      </section>
    </main>
  );
};
export default AddMenuCategory;