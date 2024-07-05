import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Modal, Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useRestaurantContext } from '../RestaurantContext';
import Loader from '../../../layouts/loader/loader';
import { deleteMenuCategoryThunk } from '../../../slices/restaurant/menuCategory/deleteMenuCategorySlice';
import { deleteMenuItemThunk } from '../../../slices/restaurant/menuItem/deleteMenuItemSlice'; 
import { fetchRestaurantById } from '../../../slices/restaurant/restaurantSlice';

const MenuCategoriesTable = () => {
  const { restaurant } = useRestaurantContext();
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const handleModalShow = (category) => {
    setSelectedCategory(category);
    setShowItemsModal(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setShowItemsModal(false);
  };

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMenuCategoryThunk(categoryId))
          .unwrap()
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id))
              .unwrap()
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'The menu category has been deleted.',
                  'success'
                );
              })
              .catch((error) => {
                console.error('Error fetching updated restaurant:', error);
              });
          })
          .catch((error) => {
            console.error('Error deleting category:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the category.',
              'error'
            );
          });
      }
    });
  };

  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this menu item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMenuItemThunk(itemId))
          .unwrap()
          .then(() => {
            dispatch(fetchRestaurantById(restaurant.id))
              .unwrap()
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'The menu item has been deleted.',
                  'success'
                );
                setShowItemsModal(false); 
              })
              .catch((error) => {
                console.error('Error fetching updated restaurant:', error);
              });
          })
          .catch((error) => {
            console.error('Error deleting menu item:', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the menu item.',
              'error'
            );
          });
      }
    });
  };

  if (!restaurant || !restaurant.menu_categories) {
    return <Loader />;
  }

  return (
    <section className='location-container container my-5'>

      <Container>

        <h2 className='text-center mb-5'>
          Menu Categories
          <span>
            <Link to={`/add-category/${restaurant.id}`}>
              <FontAwesomeIcon icon={faPlus} className="text-warning mx-3" />
            </Link>
          </span>
        </h2>

        <Row xs={1} md={3} className="g-4">

          {restaurant.menu_categories.map((category) => (

            <Col key={category.id}>

              <div className="h-100 card-color">

                <Card.Body>
                  <section className="d-flex justify-content-between align-items-center">

                    <Card.Title>{category.name}</Card.Title>

                    <span className="ms-auto">

                      <Link to={`/edit-menu-category/${category.id}`} className="text-success me-3">
                        <FontAwesomeIcon icon={faEdit} className="text-primary" />
                      </Link>

                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger me-3"
                        onClick={() => handleDelete(category.id)}
                      />

                      <Link to="#" onClick={() => handleModalShow(category)}>
                        <FontAwesomeIcon icon={faEye} className="text-warning" />
                      </Link>

                    </span>

                  </section>

                  <span className="ms-auto">

                    <p className='my-4 h6 text-light'>
                      Add Menu Item 
                      <Link to={`/add-item/${category.id}`} className="me-3 mx-2">
                        <FontAwesomeIcon icon={faPlus} className="text-warning" />
                      </Link>
                    </p>

                  </span>

                </Card.Body>

              </div>

            </Col>
          ))}
        </Row>

        <Modal show={showItemsModal} onHide={handleModalClose} dialogClassName="modal-fullscreen location-container">

          <Modal.Header closeButton>
            <Modal.Title className='text-dark'>{selectedCategory && selectedCategory.name} Menu Items</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedCategory && selectedCategory.menu_items && selectedCategory.menu_items.length > 0 ? (
              <table className="table">

                <thead>
                  <tr className='text-dark'>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Sale Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedCategory.menu_items.map((item) => (
                    <tr key={item.id} className='text-dark'>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.sale_price}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link to={`/edit-item/${item.id}`} className="text-primary me-3">
                          <FontAwesomeIcon icon={faEdit} className="text-primary" />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger"
                          onClick={() => handleDeleteItem(item.id)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            ) : (
              <p className='text-dark'>No menu items available</p>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default MenuCategoriesTable;
