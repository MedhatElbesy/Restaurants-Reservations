import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { personsImgs, iconsImgs } from '../../utils/images';
import { SidebarContext } from '../../context/SidebarContext';
import "./Sidebar.css";


const Sidebar = () => {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-open' : 'sidebar-closed');
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile" />
        </div>
        <span className="info-name">Restaurant</span>
      </div>
      <div className="navigation">
      <div className="nav-item">
          <NavLink to="/admin/home" className="nav-link" activeClassName="active">
            <img src={iconsImgs.home} alt="Restaurants" className="nav-link-icon" />
            <span className="nav-link-text px-1">Home</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/restaurants" className="nav-link" activeClassName="active">
            <img src={iconsImgs.home} alt="Restaurants" className="nav-link-icon" />
            <span className="nav-link-text px-1">Restaurants</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/category" className="nav-link" activeClassName="active">
            <img src={iconsImgs.budget} alt="Categories" className="nav-link-icon" />
            <span className="nav-link-text px-1">Categories</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/users" className="nav-link" activeClassName="active">
          <i className="bi bi-people"></i>
          <span className="nav-link-text px-1">Users</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/location" className="nav-link" activeClassName="active">
            <i className ="bi bi-geo-alt-fill"></i>
            <span className="nav-link-text px-1">Locations</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/cities" className="nav-link" activeClassName="active">
            <i className="bi bi-globe-asia-australia"></i>
            <span className="nav-link-text px-1">Cities</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/governorates" className="nav-link" activeClassName="active">
            <i className="bi bi-map"></i>
            <span className="nav-link-text px-1">Governorates</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/report" className="nav-link" activeClassName="active">
            <img src={iconsImgs.report} alt="Reports" className="nav-link-icon" />
            <span className="nav-link-text px-1">Reports</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/rating" className="nav-link" activeClassName="active">
            <img src={iconsImgs.wealth} alt="Ratings" className="nav-link-icon" />
            <span className="nav-link-text px-1">Ratings</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/comments" className="nav-link" activeClassName="active">
            <img src={iconsImgs.wallet} alt="Comments" className="nav-link-icon" />
            <span className="nav-link-text px-1">Comments</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/admin/about" className="nav-link" activeClassName="active">
            <img src={iconsImgs.gears} alt="About" className="nav-link-icon" />
            <span className="nav-link-text px-1">About</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
