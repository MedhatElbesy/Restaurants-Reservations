import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar-style.css";
import { fetchUserDataById } from "../../slices/user/fetchUserSlice";
import { decryptData } from "../../helpers/cryptoUtils";

const MyNavbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const userId = decryptData("userId");
  const userData = useSelector((state) => state.user.data);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDataById(userId));
    }
  }, [userId]);

  const isHomeRoute =
    location.pathname === "/" || location.pathname === "/home";
  const shouldHideNavbar = location.pathname.startsWith(
    "/user-dashboard" || "/admin"
  );

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        onClick={toggleSideNav}
        className="menu-icon mx-3 my-4 d-lg-none d-md-none "
      />
      {!sideNavVisible && (
        <nav
          className={`navbar navbar-expand-lg shadow-5-strong fixed-top ${
            scrolled ? "bg-white" : ""
          } ${
            isHomeRoute ? "navbar-transparent" : "bg-white"
          } d-none d-md-block`}
        >
          <div className="container-fluid">
            <div className="navbar-left">
              <img
                src="./images/logo-white.png"
                className="profile-image my-2 rounded-circle"
                alt="Logo"
                style={{ width: "2.5vw", height: "5vh" }}
              />
            </div>

            <section className="navbar-center d-flex flex-row">
              <ul className="navbar-nav my-3 d-flex flex-row">
                <li className="nav-item mx-2">
                  <a
                    className={`nav-link ${
                      scrolled || !isHomeRoute ? "text-dark" : "text-light"
                    }`}
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a
                    className={`nav-link ${
                      scrolled || !isHomeRoute ? "text-dark" : "text-light"
                    }`}
                    href="#"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a
                    className={`nav-link ${
                      scrolled || !isHomeRoute ? "text-dark" : "text-light"
                    }`}
                    href="#"
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a
                    className={`nav-link ${
                      scrolled || !isHomeRoute ? "text-dark" : "text-light"
                    }`}
                    href="#"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </section>

            <div className="navbar-right">
              <FontAwesomeIcon
                icon={faSearch}
                onClick={toggleSearch}
                className="search-icon mx-3 my-4"
              />

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
                    style={{
                      width: "2.5vw",
                      height: "5vh",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      )}
      {sideNavVisible && (
        <section className="side-nav d-block">
          <FontAwesomeIcon
            icon={faClose}
            onClick={toggleSideNav}
            className="menu-icon float-end mx-3 my-4 d-lg-none"
          />
          <ul className="side-nav-list">
            <li className="side-nav-item">
              <a href="#">Home</a>
            </li>
            <li className="side-nav-item">
              <a href="#">About</a>
            </li>
            <li className="side-nav-item">
              <a href="#">Contact</a>
            </li>
            <li className="side-nav-item">
              <a href="#">Login</a>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default MyNavbar;
