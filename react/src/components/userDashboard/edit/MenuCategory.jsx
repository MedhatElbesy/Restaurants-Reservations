import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMenuCategoryById } from '../../../slices/restaurant/menuCategory/FetchMenuCategoryById'; 
import { updateMenuCategoryThunk } from '../../../slices/restaurant/menuCategory/updateMenuCategory';
import Loader from '../../../layouts/loader/loader';

const MenuCategory = () => {
  const { menuCategoryId } = useParams();
  const dispatch = useDispatch();
  const menuCategory = useSelector((state) => state.menuCategory.menuCategory);
  const status = useSelector((state) => state.menuCategory.status);
  const error = useSelector((state) => state.menuCategory.error);
  const updateStatus = useSelector((state) => state.menuCategoryUpdate.status);
  const updateError = useSelector((state) => state.menuCategoryUpdate.error);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: '',
  });

  useEffect(() => {
    if (menuCategoryId) {
      dispatch(fetchMenuCategoryById(menuCategoryId));
    }
  }, [menuCategoryId, dispatch]);


  useEffect(() => {
    if (menuCategory) {
      setFormData({
        name: menuCategory.name || '',
        description: menuCategory.description || '',
        status: menuCategory.status ? menuCategory.status.charAt(0).toUpperCase() + menuCategory.status.slice(1) : '',
      });
    }
  }, [menuCategory]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      restaurant_id: menuCategory.restaurant_id,
      slug: menuCategory.slug,
     
    };

    dispatch(updateMenuCategoryThunk({ menuCategoryId, data: updatedData }));
  };


  if (status === 'loading' || updateStatus === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (updateStatus === 'failed') {
    return <div>Error: {updateError}</div>;
  }

  return (
    <main className="container">
      <h2 className="text-light">Edit Menu Category</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">Name</label>
          <input 
          type="text" 
          className="form-control" 
          id="name" name="name" 
          value={formData.name} 
          onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label text-light">Description</label>
          <textarea 
          className="form-control" 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label text-light">Status</label>
          <select 
          className="form-control" 
          id="status" 
          name="status" 
          value={formData.status} 
          onChange={handleChange}
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </main>
  );
};

export default MenuCategory;
