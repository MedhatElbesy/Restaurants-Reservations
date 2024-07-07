import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Loader from '../../layouts/loader/loader';
import { fetchAllCategoryAsync } from '../../slices/restaurant/restaurantCategory/restaurantCategory';
import { deleteCategoryAsync } from '../../slices/restaurant/category/categorySlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
} from '@mui/material';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.restaurantCategory);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllCategoryAsync());
  }, [dispatch]);

  const handleDeleteCategory = (categoryId) => {
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
        dispatch(deleteCategoryAsync(categoryId))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
            dispatch(fetchAllCategoryAsync());
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  const paginatedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#ffd28d', textAlign: 'center', fontFamily: '"Bad Script", cursive' }}>
      Categories{" "}
        <span
          onClick={() => window.location.href = "/add-special-category"}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-patch-plus-fill"></i>
        </span>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Cover</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((cat) => (
                <TableRow key={cat.id} className="text-center my-5">
                  <TableCell align='center'>{cat.name}</TableCell>
                  <TableCell align='center'>
                    {cat.cover ? (
                      <img
                        src={cat.cover}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "http://images.huffingtonpost.com/2015-06-10-1433951445-8676535-item8.rendition.slideshowHorizontal.mostbeautifulrestaurants09.jpg";
                        }}
                        alt="Cover"
                        width="100"
                        height="100"
                        className='rounded-circle'
                      />
                    ) : (
                      <img
                        src="http://images.huffingtonpost.com/2015-06-10-1433951445-8676535-item8.rendition.slideshowHorizontal.mostbeautifulrestaurants09.jpg"
                        alt="Cover"
                        width="100"
                        height="100"
                        className='rounded-circle'
                      />
                    )}
                  </TableCell>
                  <TableCell align='center'>{cat.description}</TableCell>
                  <TableCell align='center'>{cat.status}</TableCell>
                  <TableCell align='center'>
                    <Link to={`/edit-category/${cat.id}`}>
                      <FontAwesomeIcon icon={faEdit} className="me-2 text-primary" />
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-danger"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" align='center'>No categories available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ bgcolor: '#ffd28d', borderRadius: '0px 5px' }}
        rowsPerPageOptions={[5, 10, 25, 30, 35]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
