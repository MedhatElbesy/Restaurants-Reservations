import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTableByIdAsync,
  selectTable,
  selectFetchTableByIdStatus,
} from '../../../slices/restaurant/table/getTableSlice';
import {
  updateTableAsync,
  selectUpdateTableStatus,
  selectUpdateTableError,
} from '../../../slices/restaurant/table/updateTableSlice';
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
    Object.keys(formData).forEach((key) => {
      formDataToUpdate.append(key, formData[key]);
    });
    if (table.restaurant_location_id) {
      formDataToUpdate.append('restaurant_location_id', table.restaurant_location_id);
    }

    await dispatch(updateTableAsync({ tableId, data: formDataToUpdate })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1);
      }
    });
  };

  

  return (
    <main className="container">

      <section className="formUserDashboard">

        <h2 className="text-center my-4">Update Table</h2>

        {updateTableStatus === 'failed' && 
         <p className="text-danger">
          An error occurred: {updateTableError}
         </p>
         }

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
            <label htmlFor="max_number_of_persons">Max Number of Persons</label>
            <input
              type="number"
              id="max_number_of_persons"
              name="max_number_of_persons"
              className="form-control"
              value={formData.max_number_of_persons}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="cover">Cover</label>
            <input
              type="file"
              id="cover"
              name="cover"
              className="form-control-file text-light my-2 "
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sale_price">Sale Price</label>
            <input
              type="text"
              id="sale_price"
              name="sale_price"
              className="form-control"
              value={formData.sale_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="extra_number_of_chairs">Extra Number of Chairs</label>
            <input
              type="number"
              id="extra_number_of_chairs"
              name="extra_number_of_chairs"
              className="form-control"
              value={formData.extra_number_of_chairs}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="extra_number_of_childs_chairs">Extra Child Chairs</label>
            <input
              type="number"
              id="extra_number_of_childs_chairs"
              name="extra_number_of_childs_chairs"
              className="form-control"
              value={formData.extra_number_of_childs_chairs}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning col-12 my-4">
            Update Table
          </button>

        </form>

      </section>
      
    </main>
  );
};

export default EditTableForm;
