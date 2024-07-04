import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { BodyColorContext } from '../BodyColorContext';

const Sidebar = () => {

  const { bodyColor } = useContext(BodyColorContext);

  const handleScroll = (e, targetId) => {

    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

  };

  return (
    <nav className={`sidebar ${bodyColor === 'light' ? 'sidebar-light' : 'sidebar-dark'} col-2`}>
      <ul>
        <li><Link to={`details`} >Details</Link></li>
        <li><Link  to={`locations`}>Locations</Link></li>
        <li><Link  to={`tables`} >Location Tables</Link></li>
        <li><Link  to={`menu-category`} >Menu Categories</Link></li>
        <li><Link  to={`category`} >Specific Category</Link></li>
        <li><Link  to={`restaurant-category`} >Restaurant Caregory</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
