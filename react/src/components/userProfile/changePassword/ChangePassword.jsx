import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '../../../slices/user/changePasswordSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }
    if (formData.new_password !== formData.new_password_confirmation) {
      setErrorMessage('New password and confirmation do not match.');
      return;
    }

    try {
      await dispatch(changePasswordAsync(formData)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      });
      setErrorMessage('');
      console.log('Password changed successfully');
    } catch (error) {
      if (error.payload && error.payload.data && error.payload.data.errors) {
        setErrorMessage(Object.values(error.payload.data.errors).join(', '));
      } else {
        setErrorMessage('Failed to change password. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmation') {
      setShowNewPasswordConfirmation(!showNewPasswordConfirmation);
    }
  };

  return (
    <main className="container mt-5">

      <section className="row justify-content-center">

        <div className="col-md-6">

          <div className="card">

            <div className="card-body table-card">

              <h2 className="card-title text-center mb-4">Change Password</h2>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <form onSubmit={handleSubmit}>

                <section className="mb-3">

                  <label htmlFor="current_password" className="form-label">
                    Current Password
                  </label>

                  <div className="input-group">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="form-control"
                      id="current_password"
                      name="current_password"
                      value={formData.current_password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>

                </section>

                <section className="mb-3">

                  <label htmlFor="new_password" className="form-label">
                    New Password
                  </label>

                  <div className="input-group">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="form-control"
                      id="new_password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>

                </section>

                <section className="mb-3">

                  <label htmlFor="new_password_confirmation" className="form-label">
                    Confirm New Password
                  </label>

                  <div className="input-group">
                    <input
                      type={showNewPasswordConfirmation ? 'text' : 'password'}
                      className="form-control"
                      id="new_password_confirmation"
                      name="new_password_confirmation"
                      value={formData.new_password_confirmation}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmation')}
                    >
                      <FontAwesomeIcon icon={showNewPasswordConfirmation ? faEyeSlash : faEye} />
                    </button>
                  </div>

                </section>

                <button type="submit" className="btn btn-warning col-12 my-4">
                  Change Password
                </button>

              </form>
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePassword;
