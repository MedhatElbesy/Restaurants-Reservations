import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTableAsync, selectAddTableStatus, selectAddTableError } from '../../../slices/restaurant/table/addTableSlice';
import Loader from '../../../layouts/loader/loader';
import Swal from 'sweetalert2';


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
      const file = e.target.files[0];
      if (file && file.size > 2048 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The cover file must not be greater than 2048 kilobytes.',
        });
        return; 
      }
      setFormData({ ...formData, cover: file });
    } else {
      const { name, value } = e.target;
      const newValue = name === 'extra_number_of_chairs' ? parseInt(value) : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.cover && formData.cover.size > 2048 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The cover file must not be greater than 2048 kilobytes.',
      });
      return;
    }

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

    await dispatch(addTableAsync(formDataToSubmit))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        Swal.fire({
          title: 'Success!',
          text: 'Table added successfully!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate(-1); 
        });
      }
    });
  };

  if (addTableStatus === 'loading') {
    return <Loader />;
  }

  return (
    <main className="container mt-5">

      <section className="row justify-content-center">

        <div className="col-md-6">

          <div>

            <div className=" table-card p-3">

              <h2 className="card-title text-center mb-4">Add Table</h2>

              {addTableError && (
                <div className="alert alert-danger">
                  {addTableError.message || 'An error occurred. Please try again later.'}
                </div>
              )}

              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="form-group">
                  <input type="hidden" value={locationId}></input>
                  <label htmlFor="number_of_chairs">Number of Chairs</label>
                  <input
                    type="number"
                    id="number_of_chairs"
                    name="number_of_chairs"
                    className="form-control my-2"
                    value={formData.number_of_chairs}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="max_number_of_persons">Max Number of Persons</label>
                  <input
                    type="number"
                    id="max_number_of_persons"
                    name="max_number_of_persons"
                    className="form-control  my-2"
                    value={formData.max_number_of_persons}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="cover">Cover</label>
                  <input
                    type="file"
                    id="cover"
                    accept="image/*"
                    name="cover"
                    className="form-control-file"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control my-2"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="sale_price">Sale Price</label>
                  <input
                    type="number"
                    id="sale_price"
                    name="sale_price"
                    className="form-control my-2"
                    value={formData.sale_price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="extra_number_of_chairs">Extra Number of Chairs</label>
                  <input
                    type="number"
                    id="extra_number_of_chairs"
                    name="extra_number_of_chairs"
                    className="form-control my-2"
                    value={formData.extra_number_of_chairs}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-4">
                  <label htmlFor="extra_number_of_childs_chairs">Extra Child Chairs</label>
                  <input
                    type="number"
                    id="extra_number_of_childs_chairs"
                    name="extra_number_of_childs_chairs"
                    className="form-control my-2"
                    value={formData.extra_number_of_childs_chairs}
                    onChange={handleChange}
                  />
                </div>


                <div className="form-group my-4">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control my-2"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>


                <div className="form-group my-4">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    className="form-control my-2"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>


                <button type="submit" className="custom-button col-12 my-3">
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
