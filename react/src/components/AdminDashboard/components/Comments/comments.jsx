import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../../../slices/adminDashboard/adminSlice';
import { deleteComment } from '../../../../slices/review/commentsSlice';
import { Alert, Card, Container } from 'react-bootstrap';
import Loader from '../../../../layouts/loader/loader';
import { Box, Typography, Grid, Pagination } from '@mui/material';

const CommentsAdmin = () => {
  const dispatch = useDispatch();
  const { comments, status, error } = useSelector((state) => state.adminDashboard);
  const [page, setPage] = useState(1);
  const commentsPerPage = 5;

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedComments = comments.slice((page - 1) * commentsPerPage, page * commentsPerPage);

  return (
    <Container className='my-4' sx={{width:'65vw', marginleft:'30vw'}}>
      <Typography
        variant="h2"
        sx={{ color: '#fe6c00', textAlign: 'center', fontFamily: '"Bad Script", cursive', margin: '20px 0' }}
      >
        Comments
      </Typography>
      {status === 'loading' && <Loader />}
      {status === 'failed' && error && <Alert variant="danger">{error.message}</Alert>}
      {paginatedComments && paginatedComments.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {paginatedComments.map((comment) => (
              <Grid item key={comment.id} xs={10} sm={6} md={4}>
                <Box
                  component={Card}
                  sx={{
                    bgcolor: '#fff',
                    boxShadow: 'none',
                    wight:"10vw",
                    minheight: "250px",
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
                    </Box>
                  </Card.Body>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(comments.length / commentsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        status === 'succeeded' && <Alert variant="info">No comments available</Alert>
      )}
    </Container>
  );
};

export default CommentsAdmin;
