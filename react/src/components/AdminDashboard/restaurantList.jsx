import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "../../slices/adminDashboard/adminSlice";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import RestaurantModal from "./RestaurantDetails";
import { Typography } from "@mui/material";

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { restaurants, status, error } = useSelector(
    (state) => state.adminDashboard
  );
  const [modalOpen, setModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleShowDetails = (restaurant) => {
        setSelectedRestaurant(restaurant);
        toggleModal();
    };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, status]);

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom sx={{ color: '#ffd28d',textAlign:'center',fontFamily:'"Bad Script", cursive', margin:'20px' }}>
        Restaurant
      </Typography>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error.message}</p>}
      <div className="row">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Card
                style={{
                  width: "18rem",
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
                  <CardTitle tag="h5">{restaurant.name}</CardTitle>
                  <CardText>{restaurant.description}</CardText>
                  <Link >
                    <Button className='rounded-circle m-2' color="success" onClick={() => handleShowDetails(restaurant)}><i className="bi bi-eye-fill"></i></Button>
                  </Link>
                  <Link
                    to={`/restaurant/${restaurant.id}/edit`}
                    className="ml-2"
                  >
                    <Button color="warning" className='rounded-circle m-2'><i className="bi bi-pencil-square"></i></Button>
                  </Link>
                  <Link >
                    <Button color="danger" className='rounded-circle m-2'><i className="bi bi-trash3-fill"></i></Button>
                  </Link>
                </CardBody>
              </Card>
              {selectedRestaurant && (
                <RestaurantModal isOpen={modalOpen} toggle={toggleModal} restaurant={selectedRestaurant} />
            )}
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
