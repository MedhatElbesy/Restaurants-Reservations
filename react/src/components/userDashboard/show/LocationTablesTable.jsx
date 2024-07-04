import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Modal, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import Loader from '../../../layouts/loader/loader';
import { fetchRestaurantById } from '../../../slices/restaurant/restaurantSlice';
import {
  deleteTableAsync,
  selectDeleteTableStatus,
  selectDeleteTableError,
} from '../../../slices/restaurant/table/deleteTableSlice';
import {
  deleteTableImageAsync,
} from '../../../slices/restaurant/tableImage/tableImage';
import { useRestaurantContext } from '../../../components/userDashboard/RestaurantContext';


const LocationTablesTable = () => {
  const dispatch = useDispatch();
  const { restaurant } = useRestaurantContext();
  const deleteStatus = useSelector(selectDeleteTableStatus);
  const deleteError = useSelector(selectDeleteTableError);

  const [showTablesModal, setShowTablesModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleDelete = (tableId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this table!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableAsync(tableId))
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id));
            setShowTablesModal(false);
            Swal.fire('Deleted!', 'The table has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while deleting the table.', 'error');
          });
      }
    });
  };

  const handleDeleteImage = (imageId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this image!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTableImageAsync(imageId))
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id));
            setShowTablesModal(false);
            Swal.fire('Deleted!', 'The image has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while deleting the image.', 'error');
          });
      }
    });
  };

  const handleModalShow = (location) => {
    setSelectedLocation(location);
    setShowTablesModal(true);
  };

  const handleModalClose = () => {
    setSelectedLocation(null);
    setShowTablesModal(false);
  };

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (!restaurant || !restaurant.locations) {
    return <Loader />;
  }

  return (
    <section className="location-container container my-5">

      <h2 className="text-center">Locations Tables</h2>

      <section className="row row-cols-1 row-cols-md-3 g-4 my-5">

        {restaurant.locations.map((location) => (
          <div className="col mb-3" key={location.id}>

            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{location.address}</h5>
                <span>

                  <Link to="#" onClick={() => handleModalShow(location)}>
                    <FontAwesomeIcon icon={faEye} className="text-warning h4" />
                  </Link>

                  <Link to={`/add-table/${location.id}`} className="text-success">
                    <FontAwesomeIcon icon={faPlus} className="text-warning h4 ms-3" />
                  </Link>

                </span>
              </div>
            </div>

          </div>
        ))}
      </section>

      <Modal show={showTablesModal} onHide={handleModalClose} dialogClassName="modal-fullscreen">

        <Modal.Header closeButton className="location-container text-center">
          <Modal.Title><h2>{selectedLocation && selectedLocation.address} Tables</h2></Modal.Title>
        </Modal.Header>


        <Modal.Body className="modal-body-scroll text-light location-container">

          {selectedLocation && selectedLocation.tables && selectedLocation.tables.length > 0 ? (
            <section className="row row-cols-1 row-cols-md-3 g-4">

              {selectedLocation.tables.map((table) => (
                <div key={table.id} className="col mb-3">

                  <div className="card tables-card">

                    <div className="card-body border border-dark">

                      <p className="pb-3">
                        <strong>Number of Chairs:</strong>
                         {table.number_of_chairs}
                      </p>

                      <p className="pb-3">
                        <strong>Max Persons:</strong> 
                        {table.max_number_of_persons}
                      </p>

                      <p className="pb-3">
                        <strong>Description:</strong> 
                        {table.description}
                      </p>

                      <p className="pb-3">
                        <strong>Price:</strong> 
                        {table.price}
                      </p>

                      <p className="pb-3">
                        <strong>Sale Price:</strong> 
                        {table.sale_price}
                      </p>

                      <p className="pb-3">
                        <strong>Availability:</strong>
                        <Link to={`/availability/${table.id}`}>
                          <FontAwesomeIcon icon={faEye} className="text-warning mx-3" />
                        </Link>
                      </p>

                      <section>

                        <Link to={`/edit-table/${table.id}`} className="text-success me-3">
                          <FontAwesomeIcon icon={faEdit} className="text-success" />
                        </Link>

                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger"
                          onClick={() => handleDelete(table.id)}
                        />

                      </section>

                      <div className="d-flex justify-content-between align-items-center mt-3">

                        <>
                        
                          {table.images.length > 0 ? (
                            <section className="location-container my-5">

                              <Link to={`/add-table-image/${table.id}`}>
                                <FontAwesomeIcon icon={faPlus} className="text-warning" />
                              </Link>

                              <Slider {...carouselSettings} className="custom-slider mt-3">

                                {table.images.map((image, index) => (
                                  <div key={index} className="carousel-item custom-slide">
                                    <Card className="card-img-container">

                                      <Card.Img
                                        className="d-block w-100 rounded fixed-image"
                                        src={image.image} 
                                        alt={`Table ${table.id} Image ${index}`}
                                      />

                                      <Card.Body>
                                       
                                        <div className="text-center">
                                          <span>

                                            <Link to={`/edit-table-image/${image.id}`} className="text-success me-3">
                                              <FontAwesomeIcon icon={faEdit} className="text-success" />
                                            </Link>

                                            <FontAwesomeIcon
                                              icon={faTrash}
                                              className="text-danger mx-2"
                                              onClick={() => handleDeleteImage(image.id)}
                                            />

                                          </span>
                                        </div>

                                      </Card.Body>

                                    </Card>

                                  </div>
                                ))}
                              </Slider>
                              
                            </section>
                          ) : (
                            <div className="mt-3 text-center">
                              <p>No images available</p>
                              <Link to={`/add-table-image/${table.id}`}>
                                <FontAwesomeIcon icon={faPlus} className="text-warning" />
                              </Link>
                            </div>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p>No tables available</p>
          )}
        </Modal.Body>
      </Modal>

      {deleteStatus === 'loading' && <p>Deleting...</p>}
      {deleteError && <p>Error when deleting table</p>}
    </section>
  );
};

export default LocationTablesTable;
