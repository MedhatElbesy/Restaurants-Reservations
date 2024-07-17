import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { InputAdornment, TablePagination, TextField } from '@mui/material';
import Loader from '../../../layouts/loader/loader';
import { fetchRestaurantMenuCategories } from '../../../slices/restaurant/menuCategory/fetchRestaurantMenuCaegory';
import { fetchMenuCategoryItemsAsync } from '../../../slices/restaurant/menuItem/fetchMenuCategoryItems';
import { deleteMenuItemThunk } from '../../../slices/restaurant/menuItem/deleteMenuItemSlice';
import Swal from 'sweetalert2';
import { deleteMenuCategoryThunk } from '../../../slices/restaurant/menuCategory/deleteMenuCategorySlice';

export default function MenuCategoriesTable() {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const { allMenuCategory, status } = useSelector((state) => state.restaurantMenuCategories);
  const { items: menuItems, status: menuItemsStatus } = useSelector((state) => state.menuCategoryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [currentMenuCategoryId, setCurrentMenuCategoryId] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantMenuCategories(restaurantId));
    }
  }, [restaurantId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowMenuItems = (menuCategoryId) => {
    setCurrentMenuCategoryId(menuCategoryId);
    dispatch(fetchMenuCategoryItemsAsync(menuCategoryId));
    setShowMenuItems(true);
  };

  const handleBackToList = () => {
    setShowMenuItems(false);
    setCurrentMenuCategoryId(null);
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
            dispatch(fetchRestaurantMenuCategories(restaurantId))
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
            dispatch(fetchMenuCategoryItemsAsync(currentMenuCategoryId))
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


  if (status === 'loading' || !allMenuCategory) {
    return <Loader />;
  }

  const filteredCategories = allMenuCategory.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().includes(searchTerm) ||
    item.sale_price.toString().includes(searchTerm) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container-fluid restaurant-dashboards mx-5">

      <section className="custom-header">
        <h3 className="text-center">Restaurant Menu Categories</h3>
        <div className="roof"></div>
      </section>

      <Paper sx={{ width: '100%', marginTop: '10px' }}>

      <div className="float-end my-4" style={{ zIndex: 10, position: 'relative' }}>

          <Link to={`/add-category/${restaurantId}`} className="btn btn-outline-warning mx-2 text-dark">
            <FontAwesomeIcon icon={faPlus} /> Add Menu Category
          </Link>

          {showMenuItems && (

         <Link to={`/add-item/${currentMenuCategoryId}`} className="btn btn-outline-warning mx-2 text-dark">
          <FontAwesomeIcon icon={faPlus} /> Add Menu Item
         </Link>
          )}

     </div>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className='my-3'
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} />
              </InputAdornment>
            ),
          }}
        />

        {showMenuItems && (
          <div className="float-start my-4" style={{ zIndex: 10, position: 'relative' }}>
            <button className="btn mx-3 btn-outline-primary btn-sm" onClick={handleBackToList}>
              Back to Menu Categories
            </button>
          </div>
        )}

        <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>

          <Table aria-label="sticky table">

            <TableHead className="table-head">

              <TableRow>

                <TableCell className="text-center table-cell">Name</TableCell>
                <TableCell className="text-center table-cell">Description</TableCell>
                {showMenuItems && (
                  <>
                    <TableCell className="text-center table-cell">Price</TableCell>
                    <TableCell className="text-center table-cell">Sale Price</TableCell>
                    <TableCell className="text-center table-cell">Status</TableCell>
                  </>
                )}
                {!showMenuItems && (
                  <>
                    <TableCell className="text-center table-cell">Status</TableCell>
                  </>
                )}
                <TableCell className="text-center table-cell">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {showMenuItems ? (
                <>
                  
                  {filteredMenuItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No items found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMenuItems.map((item) => (
                      <TableRow key={item.id} hover={true}>
                        <TableCell className="text-center">{item.name}</TableCell>
                        <TableCell className="text-center">{item.description}</TableCell>
                        <TableCell className="text-center">{item.price}</TableCell>
                        <TableCell className="text-center">{item.sale_price}</TableCell>
                        <TableCell className="text-center">{item.status}</TableCell>
                        <TableCell className="d-flex align-items-center justify-content-center">
                          <Link
                            to={`/edit-item/${item.id}`}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </Link>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteItem(item.id)} >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow key={category.id} hover={true}>
                    <TableCell className="text-center">{category.name}</TableCell>
                    <TableCell className="text-center">{category.description}</TableCell>
                    <TableCell className="text-center">{category.status}</TableCell>
                    <TableCell className="d-flex align-items-center justify-content-center">
                     <div className="btn-group" role="group">
                      <button className="btn btn-outline-success btn-sm" onClick={() => handleShowMenuItems(category.id)}>
                       <FontAwesomeIcon icon={faEye} /> Show Items
                      </button>
                      <Link
                       to={`/edit-menu-category/${category.id}`}
                       className="btn btn-outline-primary ps-4 pe-4 btn-sm"
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Link>
                      <button 
                        className="btn btn-outline-danger ps-4 pe-4 btn-sm"  
                        onClick={() => handleDelete(category.id)}>
                       <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                     </div>
                   </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>

          </Table>
          
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={showMenuItems ? filteredMenuItems.length : filteredCategories.length}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </main>
  );
}
