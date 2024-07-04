import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableByIdAsync, selectTable, selectFetchTableByIdStatus } from '../../../slices/restaurant/table/getTableSlice';
import { updateTableAsync, selectUpdateTableStatus, selectUpdateTableError } from '../../../slices/restaurant/table/updateTableSlice';
import Loader from '../../../layouts/loader/loader';

const EditTableForm = () => {
  const { tableId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const table = useSelector(selectTable);
  const fetchTableStatus = useSelector(selectFetchTableByIdStatus);
  const updateTableStatus = useSelector(selectUpdateTableStatus);
  const updateTableError = useSelector(selectUpdateTableError);

  const [formData, setFormData] = useState({
    number_of_chairs: '',
    max_number_of_persons: '',
    cover: '',
    price: '',
    sale_price: '',
    extra_number_of_chairs: '',
    status: 'Available',
    extra_number_of_childs_chairs: '',
    description: '', 
  });

  useEffect(() => {
    if (tableId) {
      dispatch(fetchTableByIdAsync(tableId));
    }
  }, [tableId]);


  useEffect(() => {
    if (table) {
      setFormData({
        number_of_chairs: table.number_of_chairs || '',
        max_number_of_persons: table.max_number_of_persons || '',
        cover: '',
        price: table.price || '',
        sale_price: table.sale_price || '',
        extra_number_of_chairs: table.extra_number_of_chairs || '',
        status: table.status ? capitalizeFirstLetter(table.status) : 'Available',
        extra_number_of_childs_chairs: table.extra_number_of_childs_chairs || '',
        description: table.description || '',
      });
    }
  }, [table]);


  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    if (e.target.name === 'cover') {
      const file = e.target.files[0];
      if (file.size > 2048 * 1024) { 
        alert('The cover file must not be greater than 2048 kilobytes.');
        e.target.value = '';
        return;
      }
      setFormData({ ...formData, cover: file });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToUpdate = new FormData();
    formDataToUpdate.append('number_of_chairs', formData.number_of_chairs);
    formDataToUpdate.append('max_number_of_persons', formData.max_number_of_persons);
    formDataToUpdate.append('price', formData.price);
    formDataToUpdate.append('sale_price', formData.sale_price);
    formDataToUpdate.append('extra_number_of_chairs', formData.extra_number_of_chairs);
    formDataToUpdate.append('status', formData.status);
    formDataToUpdate.append('restaurant_location_id', table.restaurant_location_id);
    formDataToUpdate.append('extra_number_of_childs_chairs', formData.extra_number_of_childs_chairs);
    formDataToUpdate.append('description', formData.description); 

    if (formData.cover) {
      formDataToUpdate.append('cover', formData.cover);
    }
  
    console.log("Data to be updated:", Object.fromEntries(formDataToUpdate.entries())); 
  
    await dispatch(updateTableAsync({ tableId, data: formDataToUpdate }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };

  if (fetchTableStatus === 'loading' || updateTableStatus === 'loading') {
    return <Loader />;
  }

  return (
    <main className="container">

      <section className='formUserDashboard'>

        <h2 className=' text-center my-4'>Update Table</h2>

        {updateTableStatus === 'failed' && <p className="text-danger">An error occurred</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <div className="form-group">
            <label htmlFor="number_of_chairs">Number of Chairs</label>
            <input
              type="number"
              id="number_of_chairs"
              name="number_of_chairs"
              className="form-control"
              value={formData.number_of_chairs}
              onChange={handleChange}
              required
            />
          </div>

        
          <div className="form-group">
            <label htmlFor="cover">Cover</label>
            <input
              type="file"
              accept="image/*"
              id="cover"
              name="cover"
              className="form-control-file text-light my-3"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-warning my-3 col-12 mt-3">
            Update Table
          </button>

        </form>
      </section>
    </main>
  );
};

export default EditTableForm;
