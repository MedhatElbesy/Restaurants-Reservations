import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRatings } from '../../slices/adminDashboard/adminSlice';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Ratings = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.adminDashboard.ratings) || []; 
  const ratingStatus = useSelector((state) => state.adminDashboard.status);
  const error = useSelector((state) => state.adminDashboard.error);

  useEffect(() => {
    if (ratingStatus === 'idle') {
      dispatch(fetchRatings());
    }
  }, [ratingStatus, dispatch]);

  let content;

  if (ratingStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (ratingStatus === 'succeeded') {
    if (ratings.length === 0) {
      content = <div style={{ marginRight: '10px' }}>No ratings available.</div>;
    } else {
    content = (
      <Grid container spacing={3}>
        
        {Array.isArray(ratings) && ratings.map((rating) => ( 
          <Grid item key={rating.id}>
            <Card
              sx={{
                bgcolor: '#fcdb94',
                boxShadow: 'none',
                margin:'20px',
                width: 300,
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom sx={{ color: '#ffd28d',textAlign:'center',fontFamily:'"Bad Script", cursive' }}>
        Ratings
      </Typography>
      {content}
    </Box>
  );
};

export default Ratings;
