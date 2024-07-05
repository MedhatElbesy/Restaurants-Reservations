import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTableImageAsync } from '../../../slices/restaurant/tableImage/tableImage';

const AddTableImage = () => {
  const dispatch = useDispatch();
  const { tableId } = useParams(); 
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const { status, error } = useSelector(state => state.tableImage);

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const imagesUnderLimit = [];

    selectedImages.forEach(image => {
      if (image.size <= 2 * 1024 * 1024) { 
        imagesUnderLimit.push(image);
      } else {
        alert(`Image ${image.name} exceeds the size limit of 2MB and won't be uploaded.`);
      }
    });

    setImages(imagesUnderLimit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) return; 

    const formData = new FormData();
    formData.append('table_id', tableId);
    images.forEach(image => {
      formData.append('images[]', image); 
    });

    dispatch(addTableImageAsync(formData))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      });
  };

  return (
    <main className="container mt-5">
      <section className='formUserDashboard'>
        <h1 className='text-center my-2'>Add Table Image</h1>
        
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="images" className="form-label">Images:</label>
            <input
              type="file"
              id="images"
              className="form-control"
              accept="image/*"
              multiple 
              onChange={handleFileChange}
              required
            />
            <div className="invalid-feedback">
              Please choose at least one image.
            </div>
          </div>

          <button type="submit" className="btn btn-warning my-3 col-12">Add Table Images</button>

          {status === 'failed' && <p className="mt-3 text-danger">Error: An error occurred. Please try again later.</p>}
        </form>
      </section>
    </main>
  );
};

export default AddTableImage;
