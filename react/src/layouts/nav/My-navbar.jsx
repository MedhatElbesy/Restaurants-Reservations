import React, { useContext} from 'react';
import { Navbar, Nav, Form, FormControl, Button, Image, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons'; 
import { BodyColorContext } from '../../BodyColorContext';


export default function MyNavbar() {
 
  const { bodyColor, toggleColor } = useContext(BodyColorContext);

  return (
    <Navbar bg={bodyColor} expand="lg" className="sticky-top">

      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <Image
          src="https://via.placeholder.com/50"
          roundedCircle
          alt="Logo"
          className="mr-2"
        />
        <span className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>Username</span>
      </Navbar.Brand>


      <Navbar.Toggle 
       aria-controls="basic-navbar-nav"
       className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}>

        <FontAwesomeIcon icon={faBars} />

      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav">

        <Form className="d-flex mx-auto my-2 my-lg-0">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-warning">Search</Button>
          </InputGroup>
        </Form>

        <Nav className="ml-auto">

          <Nav.Link 
          className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`} 
          href="#home">
          Home
          </Nav.Link> 

          <Nav.Link
           className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}
           href="#link">
           Contact
           </Nav.Link> 

          <Nav.Link
           className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}
           href="#link">
           About
           </Nav.Link> 

          <Nav.Link 
          className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}
          href="#link">
          Profile
          </Nav.Link> 

          <Nav.Link 
          className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}
          href="#link">
          Login
          </Nav.Link> 

          <Nav.Link 
          className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`}
          href="#link">
          Register
          </Nav.Link> 
          
          <Nav.Link 
          className={`text-${bodyColor === 'light' ? 'dark' : 'light'}`} 
          href="#link">
          Logout
          </Nav.Link>

          <Button
           variant="outline-warning rounded-pill bg-black" 
           onClick={toggleColor}> 
            {bodyColor === 'light' ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
          </Button>

        </Nav>

      </Navbar.Collapse>

    </Navbar>
  );
}
