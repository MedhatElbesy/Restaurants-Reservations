import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableAsync, selectAddTableStatus, selectAddTableError } from '../../../slices/restaurant/table/addTableSlice';
import Loader from '../../../layouts/loader/loader';


const AddTableForm = () => {
  const { locationId } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTableStatus = useSelector(selectAddTableStatus);
  const addTableError = useSelector(selectAddTableError);

  const [formData, setFormData] = useState({
    number_of_chairs: '',
    max_number_of_persons: '',
    cover: null,
    price: '',
    sale_price: '',
    extra_number_of_chairs: '',
    status: 'Available',
    number_of_extra_chairs: null,
    extra_number_of_childs_chairs: 0,
    description: '', 
  });

  const handleChange = (e) => {
    if (e.target.name === 'cover') {
      setFormData({ ...formData, cover: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      const newValue = name === 'extra_number_of_chairs' ? parseInt(value) : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('number_of_chairs', formData.number_of_chairs);
    formDataToSubmit.append('max_number_of_persons', formData.max_number_of_persons);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('sale_price', formData.sale_price);
    formDataToSubmit.append('extra_number_of_chairs', formData.extra_number_of_chairs);
    formDataToSubmit.append('status', formData.status);
    formDataToSubmit.append('restaurant_location_id', locationId); 
    formDataToSubmit.append('number_of_extra_chairs', formData.number_of_extra_chairs);
    formDataToSubmit.append('extra_number_of_childs_chairs', formData.extra_number_of_childs_chairs);
    formDataToSubmit.append('description', formData.description); 

    if (formData.cover) {
      formDataToSubmit.append('cover', formData.cover);
    }

    await dispatch(addTableAsync(formDataToSubmit));
    
    navigate(`/`);
  };

  if (addTableStatus === 'loading') {
    return <Loader />;
  }

  return (
    <main className="container mt-5">

      <section className="row justify-content-center">

        <div className="col-md-6">

          <div className="card">

            <div className="card-body">

              <h2 className="card-title text-center mb-4">Add Table</h2>

              {addTableError && (
                <div className="alert alert-danger">
                  {addTableError.message || 'An error occurred. Please try again later.'}
                </div>
              )}

              <form 
              onSubmit={handleSubmit} 
              encType="multipart/form-data">

                <div className="form-group">
                  <input type="hidden" value={locationId}></input>
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

                <div className="form-group">
                  <label htmlFor="cover">Cover</label>
                  <input
                    type="file"
                    id="cover"
                    name="cover"
                    className="form-control-file"
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
                  <label htmlFor="extra_number_of_childs_chairs"> Extra Child Chairs</label>
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

                <button type="submit" className="btn btn-primary mt-3">
                  Add Table
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>
      
    </main>
  );
};

export default AddTableForm;
