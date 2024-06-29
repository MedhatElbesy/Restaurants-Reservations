import { NavLink, Routes, Route } from "react-router-dom";
import React from "react";
import './admin.css';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import About from './About';
import { Category } from "./Category";
import { Ratings } from "./ratings";
import { Reports } from "./reports";


function AdminDashboard() {
//   let history = useHistory();
const [isOpen, setIsOpen] = React.useState(false);
const [dropdownOpen, setDropdownOpen] = React.useState(false);

const toggle = () => setDropdownOpen((prevState) => !prevState);
const Handletoggle = () => {
  setIsOpen(!isOpen);
};
  function goToAdminLogin() {
    // Assuming you have some history handling mechanism, e.g., useHistory hook
    history.push("/AdminLogin");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Restaurant</h3>
            <div>
              <NavLink to="/admin" className="text-white mr-3 btn">
                Dashboard
              </NavLink>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle >
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
            <img src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg" alt="Logo" className="img-fluid rounded-circle" width="100" height="100"/>
          </div>
          <nav className="nav flex-column text-center text-white">
            <NavLink to="/admin/category" className="nav-link text-white py-4 h1 menu">
              <span>Categories</span>
            </NavLink>
            {/* <NavLink to="/admin/governotate" className="nav-link text-white menu">
              Governorates
            </NavLink> */}
            <NavLink to="/admin/rating" className="nav-link text-white py-4 menu">
              <span>Ratings</span>
            </NavLink>
            <NavLink to="/admin/report" className="nav-link text-white py-4 menu">
              <span>Reports</span>
            </NavLink>
            <NavLink to="/admin/about" className="nav-link text-white py-4 menu">
              <span>About</span>
            </NavLink>
          </nav>
        </div>

        {/* <div className="col-10">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/rating" element={<Ratings />} />
            <Route path="/admin/report" element={<Reports />} />
            <Route path="/admin/about" element={<About />} />

            {/* <Route path="/AdminDashboard/Exam/Details/:id" element={<Details />} />
            <Route path="/AdminDashboard/Exam/ViewQuestion/:id" element={<ViewQuestion />} />
            <Route path="/AdminDashboard/Exam/AddQuestion/:id" element={<AddQuestion />} />
            <Route path="/AdminDashboard/StudentList/Details/:id" element={<Student />} /> */}
          {/* </Routes>
        </div> */} 
        </div>
    </div>
  );
}

export default AdminDashboard;
