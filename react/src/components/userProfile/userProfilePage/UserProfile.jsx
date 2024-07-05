import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faLock, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BodyColorContext } from '../../../BodyColorContext';
import Loader from '../../../layouts/loader/loader';
import { deleteRestaurantAsync } from '../../../slices/restaurant/restaurantSlice';
import './userProfile.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUserAddressAsync } from '../../../slices/user/userAddressSlice';

const ITEMS_PER_PAGE = 3;

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const role = useSelector((state) => state.auth.role);
  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);
  const { bodyColor } = useContext(BodyColorContext);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userData && userData.restaurants) {
      setRestaurants(userData.restaurants);
    }
  }, [userData]);

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

  const handleDeleteRestaurant = (restaurantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this restaurant!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
        dispatch(deleteRestaurantAsync(restaurantId))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The restaurant has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'An error occurred while deleting the restaurant.',
              'error'
            );
            setRestaurants(userData.restaurants);
          });
      }
    });
  };

  if (userDataStatus === 'loading') {
    return <Loader />;
  }

  if (userDataStatus === 'failed') {
    return <div>Error: {userDataError}</div>;
  }

  if (!userData) {
    return null;
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.floor(restaurants.length / ITEMS_PER_PAGE)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const currentRestaurants = restaurants.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <main className="userProfile">

        <section className="row position-relative">

          <div className="col-12 restaurant-cover">
            <img
              style={{ height: '50vh' }}
              className="w-100"
              src={bodyColor === 'light' ? "/images/1 (1).jpg" : "/images/banner_top_all.png"}
              alt="Cover"
            />
            <div className="restaurant-overlay"></div>
          </div>

          <div className="col-2 position-absolute bottom-0 start-0 z-2">
            <img
              src={userData.profile_image_url}
              alt="Profile"
              className="rounded-circle"
            />
            
          </div>

        </section>
        
        <section className="row my-5 mx-2">

          <aside className="col-5 my-5">
          <span>
                <Link to={`/edit-profile/${userId}`} className='text-decoration-none text-warning mx-2' >
                  <FontAwesomeIcon icon={faEdit}  className='text-warning'/>
                  Edit Profile
                </Link>

                <Link to={`/change-password/${userId}`} className='text-decoration-none text-warning mx-2' >
                  <FontAwesomeIcon icon={faLock}  className='text-warning'/>
                  Change Password
                </Link>
                 
                </span>

            <section className="my-5">

              <h2 className="my-5 text-center custom-border-bottom">Personal Information</h2>
              <section className="info">
                
              
                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-5`}>
                  <strong className='custom-font'>Name:</strong> {userData.first_name} {userData.last_name}
                </p>
                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-5`}>
                  <strong className='custom-font'>Email:</strong> {userData.email}
                </p>
                <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-5`}>
                  <strong className='custom-font'>Number:</strong> {userData.mobile_number || 'N/A'}
                </p>
              </section>

            </section>

          </aside>
          
          <aside className="col-6 offset-1 aside-data">
            
            <section className='text-center'>
              <h2 className=' custom-border-bottom'>Address Information
                <Link to={`/add-address`} className="text-warning text-decoration-none">
                  <FontAwesomeIcon icon={faPlus} className="text-warning h3 my-2 mx-3" />
                </Link>
              </h2>
              {userData.addresses && userData.addresses.length > 0 ? (
                userData.addresses.map((address) => (
                  <div key={address.id} className="info my-5">
                    <div className="row">
                      <div className="col">
                        <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                          <strong className='custom-font'>Address:</strong> {address.address}
                        </p>
                        <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                          <strong className='custom-font'>Country:</strong> {address.country}
                        </p>
                      </div>
                      <div className="col">
                        <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                          <strong className='custom-font'>City:</strong> {address.city}
                        </p>
                        <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                          <strong className='custom-font'>State:</strong> {address.state}
                        </p>
                        <Link to={`/edit-address/${address.id}`} className="text-warning text-decoration-none">
                          <FontAwesomeIcon icon={faEdit} className="text-warning" />
                        </Link>
                        <span onClick={() => handleDeleteAddress(address.id)}>
                          <FontAwesomeIcon icon={faTrash} className="text-warning mx-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </section>

          </aside>

        </section>
        
        <section className='container custom-border my-5'>

          {role === 'owner' && (
            <section className='col-12 text-center my-5'>

              <h2 className='my-4'>
                Restaurants
                <span>
                  <Link to={`/add-restaurant/${userId}`}>
                    <FontAwesomeIcon icon={faPlus} className="text-warning mx-5" />
                  </Link>
                </span>
              </h2>

              <div className="row">
                {currentRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="col-md-4 my-3">

                    <section className=" text-center">
                     
                        <h3 className="card-title custom-font">{restaurant.name}</h3>
                        <Link to={`/user-dashboard/restaurant/${restaurant.id}/main`}>
                          <FontAwesomeIcon icon={faEye} className="text-warning h5 my-4 mx-4 ms-2" />
                        </Link>
                       
                          <FontAwesomeIcon icon={faTrash} 
                           className="text-danger h5 my-4 ms-2 " 
                           onClick={() => handleDeleteRestaurant(restaurant.id)} />
                       
                    
                    </section>

                  </div>
                ))}
              </div>

              <div className="my-3">
                <button onClick={handlePrevPage} 
                 disabled={currentPage === 0} 
                 className="btn btn-warning mx-2">
                  back
                </button>

                <button 
                 onClick={handleNextPage} 
                 disabled={(currentPage + 1) * ITEMS_PER_PAGE >= restaurants.length} 
                 className="btn btn-warning mx-2">
                  Next
                </button>

              </div>

            </section>
          )}
        </section>
        
      </main>
    </>
  );
};

export default UserProfile;
