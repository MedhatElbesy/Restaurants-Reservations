import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BodyColorContext } from '../../../BodyColorContext';
import Loader from '../../../layouts/loader/loader';
import './userProfile.css';
import { Link } from 'react-router-dom';


const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId); 
  const role = useSelector((state) => state.auth.role);
  const userData = useSelector((state) => state.user.data);
  const userDataStatus = useSelector((state) => state.user.status);
  const userDataError = useSelector((state) => state.user.error);
  const { bodyColor, toggleColor } = useContext(BodyColorContext);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  if (userDataStatus === 'loading') {
    return <Loader/>;
  }

  if (userDataStatus === 'failed') {
    return <div>Error: {userDataError}</div>;
  }

  if (!userData) {
    return null; 
  }

  return (
    <>
  

      <main className="userProfile">

        <section className="row position-relative">

          <div className="col-12">
            <img 
            style={{ height: '70vh' }}
            className="w-100"
            src="/images/image_slide4.jpg"
            alt="Cover" />
          </div>

          <div className="col-2 position-absolute bottom-0 start-0">
            <img
              src={userData.profile_image_url}
              alt="Profile"
              className="rounded-circle"
            />
          </div>

          <aside className="col-12 position-absolute top-0 start-50 translate-middle-x">
          <Link to={`/user-dashboard/edit-profile/${userId}`}>
              <FontAwesomeIcon icon={faEdit} className="edit-icon text-warning" />
              </Link>
          </aside>

        </section>


        <section className="row my-5">

          <aside className="col-8 my-5">

            <section className="my-5">

              <h2 className='my-5'>Personal Information</h2>

                <div className='info'>

                 <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                   <strong>Name:</strong> {userData.first_name} {userData.last_name}
                 </p>

                 <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                  <strong>Email:</strong> {userData.email}
                 </p>

                 <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                  <strong>Mobile Number:</strong> {userData.mobile_number || 'N/A'}
                 </p>

                </div>

            </section>

            <section>

              <h2>Address Information</h2>

              {userData.addresses && userData.addresses.length > 0 ? (
                userData.addresses.map((address) => (
                  <div key={address.id} className="info my-5">

                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>Country:</strong> {address.country}
                    </p>

                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>Governorate:</strong> {address.governorate}
                    </p>

                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>City:</strong> {address.city}
                    </p>

                    <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>
                      <strong>State:</strong> {address.state}
                    </p>

                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}

            </section>

            {role === 'owner' && (
            <section>
              <h2>Restaurants
                 <span>
                   <FontAwesomeIcon
                        icon={faPlus}
                        className="text-warning mx-5" />
                  </span>
              </h2>
             
                {userData.restaurants && userData.restaurants.length > 0 ? (
                  userData.restaurants.map((restaurant) => (
                    <div
                     key={restaurant.id} 
                     className="info my-5 restaurant-info">

                       <p className={`text-${bodyColor === 'light' ? 'dark' : 'light'} my-4`}>

                         <strong>Name:</strong> {restaurant.name}
                         <Link to={`/user-dashboard/restaurant/${restaurant.id}`} className='ms-3 h5'>
                            <FontAwesomeIcon icon={faEye} className="text-warning" />
                         </Link>

                       </p>

                    </div>
                  ))
                ) : (
                  <p>No restaurants found</p>
                )}
              </section>
            )}
          </aside>


          <aside className="col-4 aside-data">

            <img
             src="/images/about.png"
             alt="side image"
             className="side-image" />

          </aside>

       </section>

      </main>
   </>
  );
};

export default UserProfile;
