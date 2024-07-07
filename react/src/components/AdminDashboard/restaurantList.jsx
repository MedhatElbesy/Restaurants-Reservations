import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurants,
  updateRestaurantStatus,
} from "../../slices/adminDashboard/adminSlice";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import RestaurantModal from "./AddRestaurant";
import { Typography } from "@mui/material";
import Loader from "../../layouts/loader/loader";
import "./admin.css";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants, status, error } = useSelector(
    (state) => state.adminDashboard
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const navTo = (link) => {
    navigate(link);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, status]);

  const handleStatusToggle = (restaurant) => {
    const newStatus = restaurant.status === 'Active' ? 'Inactive' : 'Active';
    dispatch(updateRestaurantStatus({ id: restaurant.id, status: newStatus }))
      .unwrap()
      .then(() => {
        console.log(`Restaurant with id ${restaurant.id} successfully updated to ${newStatus}.`);
      })
      .catch((error) => {
        console.error(`Failed to update restaurant with id ${restaurant.id}`, error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="container">
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          color: "#ffd28d",
          textAlign: "center",
          fontFamily: '"Bad Script", cursive',
          margin: "20px",
        }}
      >
        Restaurant{" "}
        <span
          onClick={() => navTo("/add-restaurant/{$id}")}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-patch-plus-fill"></i>
        </span>
      </Typography>
      {status === "loading" && <Loader size={25} />}
      {status === "failed" && <p>Error: {error.message}</p>}
      <div className="row">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Card
                sx={{
                  boxShadow: "none",
                  margin: "20px",
                  width: "19rem",
                  height:"400px",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <img
                  alt="Sample"
                  src={restaurant.cover}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "http://images.huffingtonpost.com/2015-06-10-1433951445-8676535-item8.rendition.slideshowHorizontal.mostbeautifulrestaurants09.jpg";
                  }}
                />
                <CardBody>
                  <CardTitle tag="h5">
                    <strong>Restaurant Name: </strong> {restaurant.name}
                  </CardTitle>
                  <CardText>
                    <strong>Description: </strong> {restaurant.description}
                  </CardText>
                  <CardText>
                    <strong>No. of Branches: </strong>{" "}
                    {restaurant.locations_count}
                  </CardText>
                  <CardText>
                    <strong>Status: </strong> {restaurant.status}
                  </CardText>
                  <span onClick={() => navTo(`/restaurant/${restaurant.id}`)}>
                    <Button className="rounded-circle m-2" color="success">
                      <i className="bi bi-eye-fill"></i>
                    </Button>
                  </span>
                  <span
                    onClick={() => navTo(`/edit-restaurant/${restaurant.id}`)}
                    className="ml-2"
                  >
                    <Button color="warning" className="rounded-circle m-2">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </span>
                  <span onClick={(e) => {
                    e.stopPropagation(); 
                    handleStatusToggle(restaurant);
                  }}>
                    <Button color="danger" className="rounded-circle m-2">
                      <i className={`bi ${restaurant.status === 'Active' ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                    </Button>
                  </span>
                </CardBody>
              </Card>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
      {selectedRestaurant && (
        <RestaurantModal
          isOpen={modalOpen}
          toggle={toggleModal}
          restaurant={selectedRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantList;
