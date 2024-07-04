import { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { BodyColorContext } from "../../BodyColorContext"; 
import {  NavLink } from "react-router-dom";

import './navbar-style.css';

export default function MyNavbar() {
  const { bodyColor, toggleColor } = useContext(BodyColorContext);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <Navbar bg={bodyColor} expand="lg" className="sticky-top general">
      <Navbar.Brand href="" className="d-flex align-items-center">
       
        <Image
          src="./images/logo-white.png"
          roundedCircle
          alt="Logo"
          className="mx-5"
          style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} 
        />
     
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={`text-${bodyColor === "light" ? "dark" : "light"}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-around">
        <div className="nav-cover">
          <Form className={searchFocused ? 'focused' : 'not-focused'}>
            <InputGroup>
              <InputGroup.Text id="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <FormControl 
                type="text" 
                placeholder="Search" 
                aria-label="Search" 
                aria-describedby="search-icon" 
                onClick={() => setSearchFocused(true)} 
                onBlur={() => setSearchFocused(false)} 
              />
              <Button variant={`outline-${bodyColor === "light" ? "primary" : "warning"}`}>Search</Button>
            </InputGroup>
          </Form>
        </div>
        <Nav className="d-flex justify-content-around w-75 nav-elements">
          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/contact"
          >
            Contact
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/login"
          >
            Login
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/userprofile"
          >
            profile
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? `active text-${bodyColor === "light" ? "day" : "night"}` : `text-${bodyColor === "light" ? "day" : "night"}`}
            to="/logout"
          >
            Logout
          </NavLink>

          <Button
            variant={`outline-${bodyColor === 'light' ? 'secondary' : 'warning'} bg-${bodyColor === 'light' ? 'light' : 'dark'} rounded-pill`}
            onClick={toggleColor}
          >
            {bodyColor === "light" ? (
              <FontAwesomeIcon icon={faMoon} className="p-0 fs-5 font-weight-light"/>
            ) : (
              <FontAwesomeIcon icon={faSun} className="p-0 fs-5 font-weight-light text-warning"/>
            )}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
