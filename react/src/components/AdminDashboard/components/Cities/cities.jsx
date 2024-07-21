import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCities, addCity, updateCity, deleteCity } from '../../../../slices/adminDashboard/adminSlice';
import { Box, Typography, TextField, InputAdornment, IconButton, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CityModal from './AddCity';

const Cities = () => {
  const dispatch = useDispatch();
  const { cities, status, error } = useSelector((state) => state.adminDashboard);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState({ id: '', name: '', governorate: '' });

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCities = filteredCities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleAddClick = () => {
    setCurrentCity({ id: '', name: '', governorate: '' });
    setModalOpen(true);
  };

  const handleEditClick = (city) => {
    setCurrentCity(city);
    setModalOpen(true);
  };

  const handleDeleteClick = (cityId) => {
    dispatch(deleteCity(cityId));
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (city) => {
    if (city.id) {
      dispatch(updateCity(city));
    } else {
      dispatch(addCity(city));
    }
    setModalOpen(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ p: 3, margin: 'auto' }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#fe6c00', textAlign: 'center', fontFamily: '"Bad Script", cursive' }}>
        Cities
        <span
          onClick={handleAddClick}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-patch-plus-fill"></i>
        </span>
      </Typography>
      <TextField
        label="Search Cities"
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
        sx={{ marginBottom: '20px', backgroundColor: '#ffffff' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID</TableCell>
              <TableCell align='center'>City Name</TableCell>
              <TableCell align='center'>Governorate</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCities.length > 0 ? (
              paginatedCities.map((city) => (
                <TableRow key={city.id} className="text-center my-5">
                  <TableCell align='center'>{city.id}</TableCell>
                  <TableCell align='center'>{city.name}</TableCell>
                  <TableCell align='center'>{city.governorate}</TableCell>
                  <TableCell align='center'>
                    <Button color="warning" onClick={() => handleEditClick(city)}>
                      <EditIcon />
                    </Button>{' '}
                    <Button color="danger" onClick={() => handleDeleteClick(city.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" align='center'>No cities available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ bgcolor: '#fe6c00', borderRadius: '0px 5px' }}
        rowsPerPageOptions={[5, 10, 25, 30, 35]}
        component="div"
        count={filteredCities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CityModal
        open={modalOpen}
        handleClose={handleModalClose}
        initialData={currentCity}
        handleSubmit={handleModalSubmit}
      />
    </Box>
  );
};

export default Cities;
