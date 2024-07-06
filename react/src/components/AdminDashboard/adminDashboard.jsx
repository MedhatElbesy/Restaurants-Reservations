
import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import "./admin.css";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";


function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 border-right side">
          <h1 className="logo">Restaurant</h1>
          <nav className="nav flex-column text-center text-white">
            <NavLink
              to="/admin/categories"
              className="nav-link text-white py-4 h1 menuadmin"
            >
              <span>Categories</span>
            </NavLink>
            <NavLink
              to="/admin/rating"
              className="nav-link text-white py-4 menuadmin"
            >
              <span>Ratings</span>
            </NavLink>
            <NavLink
              to="/admin/report"
              className="nav-link text-white py-4 menuadmin"
            >
              <span>Reports</span>
            </NavLink>
            <NavLink
              to="/admin/comments"
              className="nav-link text-white py-4 menuadmin"
            >
              <span>Comments</span>
            </NavLink>
            <NavLink
              to="/admin/about"
              className="nav-link text-white py-4 menuadmin"
            >
              <span>About</span>
            </NavLink>
          </nav>
        </div>


        <div className="col-10 mainview">
        <div className="main-content">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
