import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../slices/adminDashboard/adminSlice';
import {deleteComment } from '../../slices/review/commentsSlice'
import { Alert, Card, Container } from 'react-bootstrap';
import Loader from '../../layouts/loader/loader';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentsAdmin = () => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
    console.log("sdffsdf");
  };

  return (
    <Container className='my-4'>
      <Typography
        variant="h2"
        sx={{ color: '#ffd28d', textAlign: 'center', fontFamily: '"Bad Script", cursive', margin: '20px 0' }}
      >
        Comments
      </Typography>
      {status === 'loading' && <Loader />}
      {status === 'failed' && error && <Alert variant="danger">{error.message}</Alert>}
      {comments && comments.length > 0 ? (
        <Grid container spacing={4}>
          {comments.map((comment) => (
            <Grid item key={comment.id} xs={12} sm={6} md={4}>
              <Box
                component={Card}
                sx={{
                  bgcolor: '#fcdb94',
                  boxShadow: 'none',
                  height:"250px",
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                <Card.Body>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Card.Title>Restaurant Location ID: {comment.restaurant_location_id}</Card.Title>
                      <Card.Title>User ID: {comment.user_id}</Card.Title>
                      <Card.Text className='text-secondary'>{comment.comment}</Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </Card.Subtitle>
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card.Body>
              </Box>
            </Grid>
          ))
          }
        </Grid >
      ) : (
        status === 'succeeded' && <Alert variant="info">No comments available</Alert>
      )}
    </Container >
  );
};

export default CommentsAdmin;
