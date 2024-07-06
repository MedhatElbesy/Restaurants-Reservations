import { Row, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <Row className="rest-nav text-center">
      <Nav className="justify-content-center my-3 ">
        <Nav.Link as={NavLink} to="home">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="branches">
          Branches
        </Nav.Link>
        <Nav.Link as={NavLink} to="menu">
          Menu
        </Nav.Link>
        <Nav.Link as={NavLink} to="tables">
          Tables
        </Nav.Link>
        {/* <Nav.Link as={NavLink} to="reservation">
          Reservations
        </Nav.Link> */}
      </Nav>
    </Row>
  );
}
