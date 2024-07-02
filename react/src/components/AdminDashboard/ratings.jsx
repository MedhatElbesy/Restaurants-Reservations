import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const staticRatings = [
  { id: 1, restaurant_location_id: 1, user_id: 1, rate: 4 },
  { id: 2, restaurant_location_id: 2, user_id: 2, rate: 5 },
  { id: 3, restaurant_location_id: 3, user_id: 3, rate: 3 },
  { id: 4, restaurant_location_id: 4, user_id: 4, rate: 2 },
  // Add more static data as needed
];

const Ratings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ffd28d' }}>
        Ratings
      </Typography>
      <Grid container spacing={3}>
        {staticRatings.map((rating) => (
          <Grid item  key={rating.id}>
            <Card
              sx={{
                bgcolor: '#fcdb94',
                boxShadow: 'none',
                Width: 300,
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Ratings;
