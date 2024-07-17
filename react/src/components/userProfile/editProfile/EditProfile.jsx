import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAsync } from '../../../slices/user/updateUserSlice';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';
import { decryptData } from '../../../helpers/cryptoUtils';

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = decryptData('userId');
  const userData = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    profile_image_url: '',
    gender: '',
    birth_date: '',
    profile_image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        mobile: userData.mobile_number || '',
        profile_image_url: userData.profile_image_url || '',
        gender: userData.gender || '',
        birth_date: userData.birth_date || '',
      });
    }
  }, [userData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(''); 

    const dataToUpdate = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      mobile_number: formData.mobile,
      profile_image_url: formData.profile_image_url,
      gender: formData.gender,
      birth_date: formData.birth_date,
    };

    const formDataToUpdate = new FormData();
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      formDataToUpdate.append(key, value);
    });
    if (formData.profile_image) {
      formDataToUpdate.append('profile_image', formData.profile_image);
    }

    dispatch(updateUserAsync({ userId, data: formDataToUpdate }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      });
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'profile_image') {
      const file = files[0];
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setErrorMessage('Invalid image format. Please upload a jpg, jpeg, png, or gif file.');
      } else if (file.size > 2 * 1024 * 1024) {
        setErrorMessage('Image size should not exceed 2 MB.');
      } else {
        setFormData({ ...formData, profile_image: file });
        setErrorMessage('');
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  if (loading) {
    return <Loader />;
  }

  return (
    <main className="container ">

      <section className="row my-5">

        <div className=" col-6 my-5 offset-3 formEditProfile">

          <h1 className="text-center my-4">Edit Profile</h1>

          <div className="">

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="profile_image" className="form-label">
                  Profile Image:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profile_image"
                  name="profile_image"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender:
                </label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="birth_date" className="form-label">
                  Birth Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birth_date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-warning my-4 col-12">
                Update
              </button>

            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
