import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { fetchRestaurantById } from '../slices/restaurant/restaurantSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [restaurantId]);

  return (
    <main className="sidebar-container">
    
      <section className="upperbar my-2">
       
       {restaurant && <p>{restaurant.name} Dashboard</p>}
       
        <div className="ms-auto mx-2">
          <FontAwesomeIcon icon={faBell} className="custom-notification-icon " />
        </div>

      </section>

   
      <aside className="sidebar col-md-2 col-3">
        <Link to="main" className="sidebar-link">Restaurant Dashboard</Link>
        <Link to="details" className="sidebar-link">Restaurant Details</Link>
        <Link to="locations" className="sidebar-link">Restaurant Locations</Link>
        <Link to="menu-category" className="sidebar-link"> Show Menu Category</Link>
        <Link to="restaurant-category" className="sidebar-link">Restaurant Category</Link>
        <Link to="category" className="sidebar-link">Show Specific Category</Link>
        <Link to="reservation" className="sidebar-link"> Show Reservations</Link>
      </aside>

    
      <div className="content col-8 my-5 offset-2">
        <Outlet context={{ restaurant }} />
      </div>

    </main>
    
  );
}

export default Sidebar;
