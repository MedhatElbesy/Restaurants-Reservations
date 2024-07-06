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
        <div className="col-12 bg py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Restaurant</h3>
            <div>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle>
                  <img
                    src="https://tse4.mm.bing.net/th?id=OIP.sI45nZnXQXzMqdoDm4d36AHaE7&pid=Api&P=0&h=220"
                    alt="profile"
                    className="rounded-circle"
                    width="30"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Info</DropdownItem>
                  <DropdownItem>My Account</DropdownItem>
                  <DropdownItem>Edit Profile</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-2 border-right side">
          <div className="text-center my-3">
            <img
              src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg"
              alt="Logo"
              className="img-fluid rounded-circle"
              width="100"
              height="100"
            />
          </div>
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

        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
