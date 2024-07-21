import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGovernorates } from '../../../../slices/adminDashboard/adminSlice';
import { Box, Typography, TextField, InputAdornment, IconButton, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Governorates = () => {
  const dispatch = useDispatch();
  const { governorates, status, error } = useSelector((state) => state.adminDashboard);

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchGovernorates());
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

  const filteredGovernorates = governorates.filter((gov) =>
    gov.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedGovernorates = filteredGovernorates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ p: 3, margin: 'auto' }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#fe6c00', textAlign: 'center', fontFamily: '"Bad Script", cursive' }}>
        Governorates
        <span onClick={() => console.log('Add Governorate')} style={{ cursor: 'pointer' }}>
          <i className="bi bi-patch-plus-fill"></i>
        </span>
      </Typography>
      <TextField
        label="Search Governorates"
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
              <TableCell align='center'>Governorate Name</TableCell>
              <TableCell align='center'>Country</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedGovernorates.length > 0 ? (
              paginatedGovernorates.map((governorate) => (
                <TableRow key={governorate.id} className="text-center my-5">
                  <TableCell align='center'>{governorate.id}</TableCell>
                  <TableCell align='center'>{governorate.name}</TableCell>
                  <TableCell align='center'>{governorate.country.name}</TableCell>
                  <TableCell align='center'>
                    <Button color="warning" onClick={() => console.log('Edit governorate', governorate.id)}>
                      <EditIcon />
                    </Button>{' '}
                    <Button color="danger" onClick={() => console.log('Delete governorate', governorate.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" align='center'>No governorates available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ bgcolor: '#fe6c00', borderRadius: '0px 5px' }}
        rowsPerPageOptions={[5, 10, 25, 30, 35]}
        component="div"
        count={filteredGovernorates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Governorates;
