import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './admin.css';

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <h2 className='text-white'>Restaurant</h2>
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button close size="sm" onClick={showMobilemenu}></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/starter"
              className={
                location.pathname === "/starter"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-speedometer2"></i>
              <span className="ms-3 d-inline-block">Dashboard</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/alerts"
              className={
                location.pathname === "/alerts"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-bell"></i>
              <span className="ms-3 d-inline-block">Alert</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/badges"
              className={
                location.pathname === "/badges"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-patch-check"></i>
              <span className="ms-3 d-inline-block">Badges</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/buttons"
              className={
                location.pathname === "/buttons"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-hdd-stack"></i>
              <span className="ms-3 d-inline-block">Buttons</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/cards"
              className={
                location.pathname === "/cards"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-card-text"></i>
              <span className="ms-3 d-inline-block">Cards</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/grid"
              className={
                location.pathname === "/grid"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-columns"></i>
              <span className="ms-3 d-inline-block">Grid</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/table"
              className={
                location.pathname === "/table"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-layout-split"></i>
              <span className="ms-3 d-inline-block">Table</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/forms"
              className={
                location.pathname === "/forms"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-textarea-resize"></i>
              <span className="ms-3 d-inline-block">Forms</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/breadcrumbs"
              className={
                location.pathname === "/breadcrumbs"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-link"></i>
              <span className="ms-3 d-inline-block">Breadcrumbs</span>
            </NavLink>
          </NavItem>
          <NavItem className="sidenav-bg">
            <NavLink
              tag={Link}
              to="/about"
              className={
                location.pathname === "/about"
                  ? "text-primary py-3"
                  : "text-secondary py-3"
              }
            >
              <i className="bi bi-people"></i>
              <span className="ms-3 d-inline-block">About</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
