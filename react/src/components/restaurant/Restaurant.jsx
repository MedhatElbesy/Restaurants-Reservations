import { fetchRestaurantById } from "../../slices/restaurant/restaurantSlice";
import { useParams, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

import Navbar from "./navbar/Navbar";
import Footer from "./home/Footer";
import Loader from "../../layouts/loader/loader"

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { restaurant, loading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [dispatch, restaurantId]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid>
      <Navbar />
      {loading && <Loader loading={loading}/>}
      {restaurant && (
        <>
          <Outlet />
          <Footer restaurant={restaurant} />
        </>
      )}
    </Container>
  );
}
