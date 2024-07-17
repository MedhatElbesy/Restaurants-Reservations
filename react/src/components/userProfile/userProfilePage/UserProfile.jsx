import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './userProfile.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faEdit, faLock, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../layouts/loader/loader';
import Swal from 'sweetalert2';
import { deleteUserAddressAsync } from '../../../slices/user/userAddressSlice';
import { decryptData } from '../../../helpers/cryptoUtils';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const userId = decryptData('userId');
  const role = decryptData('role'); 
  
  if (!userData) {
    return <Loader/>;
  }

  const handleDeleteAddress = (addressId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this address!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAddressAsync({ userId, addressId }))
          .then(() => {
          
            dispatch(fetchUserDataById(userId)); 
            
            Swal.fire(
              'Deleted!',
              'The address has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the address.',
              'error'
            );
          });
      }
    });
  };

  const [firstAddress] = userData.addresses;

  return (
    <main className='user-profile my-5 p-5'>

      <section className="custom-border container-fluid">

        <p className='h3 my-4'>My Profile</p>

        <section className="custom-card p-3 my-3">

          <div className="d-flex align-items-center">

            <section className="profile-image-container">
              <img
                src={userData.profile_image_url}
                className="profile-image rounded-circle"
                alt="Profile"
              />
            </section>

            <section className="user-details  ms-3">
              <p className='h2'>{userData.first_name} {userData.last_name}</p>
              
              {firstAddress && (
                <div className="mb-3">
                  <p className='custom-text'>{firstAddress.address}, {firstAddress.city}, {firstAddress.country}</p>
                </div>
              )}
            </section>

          </div>

          <div className='my-3'>

          <NavLink to={`/change-password`}  className="text-decoration-none d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className='text-dark me-2' />
            <span>Change Password</span>
          </NavLink>
          {role === 'owner' && (
          <NavLink to="/user-restaurants" className="text-decoration-none d-flex align-items-center my-2">
            <FontAwesomeIcon icon={faCube} className='text-dark me-2' />
            <span>Dashboard</span>
          </NavLink>
          )}
          </div>

        </section>

        <section className="custom-card my-5">

          <div className="card-header h5 d-flex justify-content-between align-items-center">
            <span><p className='my-3 h2'>Personal Information</p></span>
            <NavLink to={`/edit-profile`}  className="btn btn-outline-primary d-flex align-items-center" title="Edit">
              <FontAwesomeIcon icon={faEdit} className='me-2' />
              <span>Edit</span>
            </NavLink>
          </div>

          <div className="card-body my-4">

            <section className="row">

              <div className="col-md-4">
                <p className='h5'>First Name</p>
                <p>{userData.first_name}</p>
              </div>

              <div className="col-md-4">
                <p className='h5'>Last Name</p>
                <p>{userData.last_name}</p>
              </div>

            </section>

            <section className="row my-3">

              <div className="col-md-4">
                <p className='h5'>Email</p>
                <p>{userData.email}</p>
              </div>

              <div className="col-md-4">
                <p className='h5'>Phone</p>
                <p>{userData.mobile_number || 'N/A'}</p>
              </div>

            </section>

          </div>
          
        </section>

        <section className="custom-card mb-3">

          <div className="card-header h5 d-flex justify-content-between align-items-center">
            <span><p className='my-3 h2'>Addresses</p></span>
            <NavLink to={`/add-address`} className="btn btn-outline-warning d-flex align-items-center" title="Add">
              <FontAwesomeIcon icon={faPlus} className='me-2' />
              <span>Add</span>
            </NavLink>
          </div>
          
          <div className="card-body my-4">
            {userData.addresses.map((address) => (
              <div key={address.id} className="custom-card p-3 mb-3">

                <section className="row">

                  <div className="col-md-4">
                    <p className='h5'>Address</p>
                    <p>{address.address}</p>
                  </div>

                  <div className="col-md-4">
                    <p className='h5'>City</p>
                    <p>{address.city}</p>
                  </div>

                </section>

                <section className="row mb-2">

                  <div className="col-md-4">
                    <p className='h5'>Country</p>
                    <p>{address.country}</p>
                  </div>

                  <div className="col-md-4">
                    <p className='h5'>State</p>
                    <p>{address.state}</p>
                  </div>

                </section>

                <section className="row">

                  <div className="col-md-4">
                    <p className='h5'>Governorate</p>
                    <p>{address.governorate}</p>
                  </div>

                  <div className="col-md-4">

                    <NavLink 
                    to={`/edit-address/${address.id}`} 
                    className="btn btn-outline-primary btn-sm pe-3 ps-3" 
                    title="Edit">
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </NavLink>

                    <button 
                     onClick={() => handleDeleteAddress(address.id)} 
                     className="btn btn-outline-danger btn-sm mx-2" 
                     title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                  </div>

                </section>

              </div>
            ))}
          </div>

        </section>

      </section>

    </main>
  );
};

export default UserProfile;
