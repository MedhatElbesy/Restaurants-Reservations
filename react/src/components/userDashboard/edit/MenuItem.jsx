import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';
import { fetchMenuItemById } from '../../../slices/restaurant/menuItem/fetchMenuItemById';
import { updateMenuItemThunk } from '../../../slices/restaurant/menuItem/updateMenuItem';

const MenuItem = () => {

  const { menuItemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuItem = useSelector((state) => state.menuItem.menuItem);
  const status = useSelector((state) => state.menuItem.status);
  const error = useSelector((state) => state.menuItem.error);
  const loading = useSelector((state) => state.menuItem.loading);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    status: '',
  });


  useEffect(() => {
    if (menuItemId) {
      dispatch(fetchMenuItemById(menuItemId));
    }
  }, [menuItemId]);


  useEffect(() => {
    if (menuItem) {
      setFormData({
        name: menuItem.name || '',
        description: menuItem.description || '',
        price: menuItem.price || '',
        salePrice: menuItem.sale_price || '',
        status: typeof menuItem.status === 'string' ? menuItem.status.charAt(0).toUpperCase() + menuItem.status.slice(1) : '',
      });
    }
  }, [menuItem]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!menuItem || !menuItem.menu_category_id) {
      console.error('Menu Category ID is required.');
      return;
    }
    dispatch(updateMenuItemThunk({ menuItemId, data: { ...formData,menu_category_id: menuItem.menu_category_id } }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };


  if (loading) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="container">

      <section className='formUserDashboard'>

    
      <h2 className='text-center my-4'>Edit Menu Item</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
          type="text" 
          required
          className="form-control" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
           />
        </div>


        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
          className="form-control" 
          id="description" 
          name="description"
          required 
          value={formData.description} 
          onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input 
          type="number" 
          required
          className="form-control" 
          id="price" name="price" 
          value={formData.price} 
          onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="salePrice" className="form-label">Sale price</label>
          <input 
          type="number" 
          className="form-control" 
          id="salePrice" 
          name="salePrice" 
          required
          value={formData.salePrice} 
          onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select 
          className="form-control" 
          id="status" 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>

          </select>
        </div>

        <button type="submit" className="btn btn-warning my-4 col-12">Update</button>
      </form>

      </section>

    </main>
  );
};

export default MenuItem;

