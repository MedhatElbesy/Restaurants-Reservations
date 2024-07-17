import { fetchRestaurantById } from "../../slices/restaurant/restaurantSlice";
import { useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Loader from "../../layouts/loader/loader";
import "./Restaurant.css"


export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { restaurant, status, error } = useSelector(
    (state) => state.restaurant
  );

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (restaurantId && isFirstRender.current) {
      dispatch(fetchRestaurantById(restaurantId));
      isFirstRender.current = false;
    }
  }, [dispatch, restaurantId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!restaurant && status === "loading") {
    return <Loader />;
  }

  return (
    <Container fluid className="user-restaurant-container display-flex flex-column">
      <Navbar />
      {restaurant && (
        <>
          <Outlet />
          <Footer restaurant={restaurant} />
        </>
      )}
    </Container>
  );
}
