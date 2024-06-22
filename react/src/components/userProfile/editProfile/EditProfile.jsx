import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDataAsync } from '../../../slices/user/updateUserSlice';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';

export default function EditProfile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const userData = useSelector((state) => state.user.data);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        mobile: userData.mobile_number || ''
      });
    }
  }, [userData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserDataAsync({ userId, data: formData }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (

    <main className="container mt-5">

      <section className="row justify-content-center">

        <div className="card col-12">

            <h5 className="card-header">Edit Profile</h5>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label
                   htmlFor="firstName"
                   className="form-label">
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

                  <label
                   htmlFor="lastName"
                   className="form-label">
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

                  <label
                   htmlFor="email"
                   className="form-label">
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

                  <label
                   htmlFor="mobile"
                   className="form-label">
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

                <button type="submit" className="btn btn-primary">Update</button>

              </form>

            </div>
            
          </div>

      </section>

    </main>
  );
}

