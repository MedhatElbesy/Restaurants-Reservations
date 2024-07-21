import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRatings } from '../../../../slices/adminDashboard/adminSlice';
import { Box, Card, CardContent, Typography, Grid, TextField, TablePagination } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Ratings = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.adminDashboard.ratings) || [];
  const ratingStatus = useSelector((state) => state.adminDashboard.status);
  const error = useSelector((state) => state.adminDashboard.error);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    if (ratingStatus === 'idle') {
      dispatch(fetchRatings());
    }
  }, [ratingStatus, dispatch]);

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

  const filteredRatings = ratings.filter((rating) =>
    rating.restaurant_location_id.toString().includes(searchTerm) ||
    rating.user_id.toString().includes(searchTerm) ||
    rating.rate.toString().includes(searchTerm)
  );

  const paginatedRatings = filteredRatings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  let content;

  if (ratingStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (ratingStatus === 'succeeded') {
    if (filteredRatings.length === 0) {
      content = <div style={{ marginRight: '10px' }}>No ratings available.</div>;
    } else {
      content = (
        <Grid container spacing={3}>
          {paginatedRatings.map((rating) => (
            <Grid item key={rating.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  bgcolor: '#ffc397',
                  boxShadow: 'none',
                  margin: '20px',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Restaurant Name: {rating.restaurant_location_id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    User ID: {rating.user_id}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(rating.rate)].map((_, index) => (
                      <StarIcon key={index} color="warning" />
                    ))}
                    {[...Array(5 - rating.rate)].map((_, index) => (
                      <StarIcon key={index} color="disabled" />
                    ))}
                  </Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Created at: {rating.created_at}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Updated at: {rating.updated_at}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  } else if (ratingStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 3, margin: "auto" }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#fe6c00', textAlign: 'center', fontFamily: '"Bad Script", cursive' }}>
        Ratings
      </Typography>
      <TextField
        label="Search Ratings"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '20px', backgroundColor: '#ffffff' }}
      />
      {content}
      <Box display="flex" justifyContent="center" marginTop="20px">
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={filteredRatings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: '#fe6c00',
            '& .MuiTablePagination-toolbar': { color: '#ffffff' },
            '& .MuiTablePagination-selectIcon': { color: '#ffffff' },
            '& .MuiInputBase-root': { color: '#ffffff' },
            '& .MuiTablePagination-actions': { color: '#ffffff' },
            '& .MuiTablePagination-displayedRows': { color: '#ffffff' },
          }}
        />
      </Box>
    </Box>
  );
};

export default Ratings;
