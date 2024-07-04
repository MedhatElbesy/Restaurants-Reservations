import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTableImageByIdAsync, updateTableImageAsync } from '../../../slices/restaurant/tableImage/tableImage';


const EditTableImage = () => {
  const dispatch = useDispatch();
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { status, error, selectedImage } = useSelector(state => state.tableImage);

  useEffect(() => {
    if (imageId) {
      dispatch(fetchTableImageByIdAsync(imageId));
    }
  }, [imageId]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return; 

    const formData = new FormData();
    formData.append('table_id', selectedImage.table_id); 
    formData.append('image', image);

    dispatch(updateTableImageAsync({ imageId, data: formData }))
    .then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(-1); 
      }
    });
  };

  return (
    <main className="container mt-5">

      <section className='formUserDashboard'>

        <h1 className='text-center my-4'>Update Table Image</h1>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">

           <label htmlFor="image" className="form-label">Image:</label>
           <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <section className="invalid-feedback">
            Please choose an image.
          </section>

        </div>

        <button type="submit" className="btn btn-warning my-4 col-12">Update Table Image</button>
        {status === 'failed' && <p className="mt-3 text-danger">Error: "An error occurred. Please try again later."</p>}

      </form>

      </section>
      
    </main>
  );
};

export default EditTableImage;
