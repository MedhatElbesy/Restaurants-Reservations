import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addMenuItemThunk } from '../../../slices/restaurant/menuItem/addMenuItem'; 

const AddMenuItem = () => {
  const { menuCategoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    sale_price: '', 
    status: 'Available',
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
    if (!menuCategoryId) {
      console.error('Menu Category ID is required.');
      return;
    }
    dispatch(addMenuItemThunk({ ...formData, menu_category_id: menuCategoryId }))
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

      <h2 className='text-light text-center my-5'>Add Menu Item</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">Name</label>
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
          <label htmlFor="slug" className="form-label text-light">Slug</label>
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
          <label htmlFor="description" className="form-label text-light">Description</label>
          <textarea 
          className="form-control" 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label text-light">Price</label>
          <input 
          type="number" 
          className="form-control" 
          id="price" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="sale_price" className="form-label text-light">Sale Price</label>
          <input 
          type="number" 
          className="form-control" 
          id="sale_price" 
          name="sale_price" 
          value={formData.sale_price} 
          onChange={handleChange} 
          required />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label text-light">Status</label>
          <select 
          className="form-control" 
          id="status" 
          name="status" 
          value={formData.status} 
          onChange={handleChange} 
          required>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary col-12">Add Menu Item</button>
      </form>

      </section>
    </main>
  );
};

export default AddMenuItem;
