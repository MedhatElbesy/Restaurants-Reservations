import { Row, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <Row className="text-center my-3 ">
      <Nav className="justify-content-center">
        <Nav.Link as={NavLink} to="home" className="text-main">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="menu" className="text-main">
          Menu
        </Nav.Link>
        <Nav.Link as={NavLink} to="reservation" className="text-main">
          Reservations
        </Nav.Link>
        <Nav.Link as={NavLink} to="tables" className="text-main">
          Tables
        </Nav.Link>
      </Nav>
    </Row>
  );
}
