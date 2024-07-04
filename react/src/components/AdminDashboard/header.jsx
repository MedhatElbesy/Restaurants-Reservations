import React from "react";
import { Link, NavLink } from "react-router-dom";
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
import '../../index.css';
// import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
// import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              <i className="bi bi-star-fill"></i> Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              <i className="bi bi-info-circle-fill"></i> About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              <i className="bi bi-menu-button-fill"></i> DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem><i className="bi bi-option"></i> Option 1</DropdownItem>
              <DropdownItem><i className="bi bi-option"></i> Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="bi bi-arrow-counterclockwise"></i> Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="light">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.sI45nZnXQXzMqdoDm4d36AHaE7&pid=Api&P=0&h=220"
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem><i className="bi bi-person"></i> My Account</DropdownItem>
            <DropdownItem><i className="bi bi-pencil"></i> Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem><i className="bi bi-wallet"></i> My Balance</DropdownItem>
            <DropdownItem><i className="bi bi-envelope"></i> Inbox</DropdownItem>
            <DropdownItem><i className="bi bi-box-arrow-right"></i> Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

const Sidebar = () => {
  return (
    <div className="col-2 border-right side">
      <div className="text-center my-3">
        <img src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg" alt="Logo" className="img-fluid rounded-circle" width="100" height="100" />
      </div>
      <nav className="nav flex-column text-center text-white">
        <NavLink to="/admin/category" className="nav-link text-white py-4 h1 menuadmin">
          <i className="bi bi-card-list"></i> <span>Categories</span>
        </NavLink>
        <NavLink to="/admin/rating" className="nav-link text-white py-4 menuadmin">
          <i className="bi bi-star-fill"></i> <span>Ratings</span>
        </NavLink>
        <NavLink to="/admin/report" className="nav-link text-white py-4 menuadmin">
          <i className="bi bi-file-earmark-text"></i> <span>Reports</span>
        </NavLink>
        <NavLink to="/admin/comments" className="nav-link text-white py-4 menuadmin">
          <i className="bi bi-chat-dots"></i> <span>Comments</span>
        </NavLink>
        <NavLink to="/admin/about" className="nav-link text-white py-4 menuadmin">
          <i className="bi bi-info-circle-fill"></i> <span>About</span>
        </NavLink>
      </nav>
    </div>
  );
};

export { Header, Sidebar };
