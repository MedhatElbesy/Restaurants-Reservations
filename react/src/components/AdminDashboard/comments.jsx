import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../slices/adminDashboard/adminSlice';
import { Spinner, Alert, Card, Container } from 'react-bootstrap';

const CommentsAdmin = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="my-4">Comments</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} className="my-3">
            <Card.Body>
              <Card.Title>Restaurant Location ID: {comment.restaurant_location_id}</Card.Title>
              <Card.Title>User ID: {comment.user_id}</Card.Title>
              <Card.Text>{comment.comment}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">{new Date(comment.created_at).toLocaleDateString()}</Card.Subtitle>
            </Card.Body>
          </Card>
        ))
      ) : (
        !loading && <Alert variant="info">No comments available</Alert>
      )}
    </Container>
  );
};

export default CommentsAdmin;
