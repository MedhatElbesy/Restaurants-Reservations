import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar-style.css';
import { fetchUserDataById } from '../../slices/user/fetchUserSlice';
import { decryptData } from '../../helpers/cryptoUtils';

const MyNavbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = decryptData('userId');
  const userData = useSelector((state) => state.user.data);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  
  const isHomeRoute = location.pathname === '/' || location.pathname === '/home';


  const shouldHideNavbar = location.pathname.startsWith('/user-dashboard');

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav 
    className={`navbar navbar-expand-lg shadow-5-strong fixed-top ${scrolled ? 'bg-white' : ''} ${isHomeRoute ? 'navbar-transparent' : 'bg-white'}`}
    >
      <div className="container-fluid">

        <div className="navbar-left">
          <img
            src="./images/logo-white.png"
            className="profile-image rounded-circle"
            alt="Logo"
            style={{ width: '40px', height: '5vh' }}
          />
        </div>

        <section className="navbar-center">

          <ul className="navbar-nav my-3">

            <li className="nav-item mx-2">
              <a className={`nav-link ${scrolled || !isHomeRoute ? 'text-dark' : 'text-light'}`} href="#">Home</a>
            </li>

            <li className="nav-item mx-2">
              <a className={`nav-link ${scrolled || !isHomeRoute ? 'text-dark' : 'text-light'}`} href="#">About</a>
            </li>

            <li className="nav-item mx-2">
              <a className={`nav-link ${scrolled || !isHomeRoute ? 'text-dark' : 'text-light'}`} href="#">Contact</a>
            </li>

            <li className="nav-item mx-2">
              <a className={`nav-link ${scrolled || !isHomeRoute ? 'text-dark' : 'text-light'}`} href="#">Login</a>
            </li>

          </ul>

        </section>

        <div className="navbar-right">

          <FontAwesomeIcon icon={faSearch} onClick={toggleSearch} className="search-icon mx-3 my-4" />

          {searchVisible && (
            <input
              type="text"
              className="search-input mx-3"
              placeholder="Search..."
            />
          )}
          {userData && (
            <NavLink to="/userprofile">
              <img
                src={userData.profile_image_url}
                className="profile-image rounded-circle"
                alt="Profile"
                style={{ width: '40px', height: '5vh', marginRight: '10px' }}
              />
            </NavLink>
          )}
        </div>

      </div>
      
    </nav>
  );
};

export default MyNavbar;
