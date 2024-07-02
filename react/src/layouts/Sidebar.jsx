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
        <li><Link  onClick={(e) => handleScroll(e, 'details')}>Details</Link></li>
        <li><Link  onClick={(e) => handleScroll(e, 'locations')}>Locations</Link></li>
        <li><Link  onClick={(e) => handleScroll(e, 'location-tables')}>Location Tables</Link></li>
        <li><Link  onClick={(e) => handleScroll(e, 'menu-categories')}>Menu Categories</Link></li>
        <li><Link  onClick={(e) => handleScroll(e, 'specific-category')}>Specific Category</Link></li>
        <li><Link  onClick={(e) => handleScroll(e, 'images')}>Restaurant Images</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
