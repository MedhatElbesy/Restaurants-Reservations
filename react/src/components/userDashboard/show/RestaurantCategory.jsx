import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchRestaurantCategoryAsync, deleteCategoryAsync } from '../../../slices/restaurant/restaurantCategory/restaurantCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { InputAdornment, TablePagination, TextField } from '@mui/material';
import Loader from '../../../layouts/loader/loader';
import Swal from 'sweetalert2';

const RestaurantCategory = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const { restaurantCategory, status } = useSelector((state) => state.restaurantCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurantCategory, setFilteredRestaurantCategory] = useState([]);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantCategoryAsync(restaurantId));
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantCategory) {
      setFilteredRestaurantCategory(
        restaurantCategory.filter((item) => item.status !== 'deleted')
      );
    }
  }, [restaurantCategory]);

  if (status === 'loading' || !restaurantCategory) {
    return <Loader />;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAsync(categoryId))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your category has been deleted.',
              'success'
            );
            setFilteredRestaurantCategory((prevCategories) =>
              prevCategories.filter((category) => category.id !== categoryId)
            );
          })
          .catch((error) => {
            Swal.fire(
              'Error',
              'Failed to delete category.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your category is safe :)',
          'info'
        );
      }
    });
  };

  const filteredCategories = filteredRestaurantCategory.filter((item) => {
    const name = item.category.name || '';
    const status = item.status || '';

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <main className="container-fluid restaurant-dashboards mx-5">

      <section className="custom-header">
        <h3 className="text-center">Restaurant Categories</h3>
        <div className="roof"></div>
      </section>

      <Paper sx={{ width: '100%', marginTop: '10px' }}>
        <div className="float-end my-4" style={{ zIndex: 10, position: 'relative' }}>
          <Link to={`/add-restaurant-category/${restaurantId}`} className="btn btn-outline-warning mx-2 text-dark">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Link>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className="my-3"
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

        <TableContainer sx={{ maxHeight: 440, overflowY: 'auto' }}>

          <Table aria-label="sticky table">

            <TableHead className="table-head">
              <TableRow>
                <TableCell className="text-center table-cell">Name</TableCell>
                <TableCell className="text-center table-cell">Status</TableCell>
                <TableCell className="text-center table-cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((item) => (
                  <TableRow key={item.id} hover={true}>
                    <TableCell className="text-center">{item.category.name}</TableCell>
                    <TableCell className="text-center">{item.status}</TableCell>
                    <TableCell className="d-flex align-items-center justify-content-center">
                      <Link to={`/edit-restaurant-category/${item.id}`} className="btn btn-outline-primary btn-sm me-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteCategory(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
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
          count={filteredCategories.length}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </main>
  );
};

export default RestaurantCategory;
