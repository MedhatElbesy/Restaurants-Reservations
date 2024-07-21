import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurants,
  updateRestaurantStatus,
} from "../../../../slices/adminDashboard/adminSlice";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import RestaurantModal from "./AddRestaurant";
import { Typography, Box, TextField, InputAdornment, IconButton, TablePagination, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loader from '../../../../layouts/loader/loader';

import "./restaurantlist.css";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants, status, error } = useSelector(
    (state) => state.adminDashboard
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRestaurants = filteredRestaurants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container">
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          color: "#fe6c00",
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
      <TextField
        label="Search Restaurants"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: "20px", backgroundColor: "#ffffff" }}
      />
      {status === "loading" && <Loader size={25} />}
      {status === "failed" && <p>Error: {error.message}</p>}
      <div className="row">
        {paginatedRestaurants.length > 0 ? (
          paginatedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Card
                sx={{
                  boxShadow: "none",
                  margin: "20px",
                  height: "400px",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <img
                  alt="Sample"
                  src={restaurant.cover}
                  height="300px"
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
      <Box display="flex" justifyContent="center" marginTop="20px">
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={filteredRestaurants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
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
