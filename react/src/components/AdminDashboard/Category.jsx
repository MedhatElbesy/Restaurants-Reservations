import  { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../slices/adminDashboard/adminSlice'; // Adjust the path accordingly
import Blog from "./Blog";

export const Category = () => {
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/***Top Cards***/}
      {/* <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Yearly Earning"
            earning="$21k"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Refund given"
            earning="$1k"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Yearly Project"
            earning="456"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Weekly Sales"
            earning="210"
            icon="bi bi-bag"
          />
        </Col>
      </Row> */}
      
      {/***Table ***/}
      {/* <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row> */}
      {/***Blog Cards***/}
      <Row>
        {restaurants.map((category, index) => (
          <Col sm="6" lg="6" xl="3" key={index} className="m-4">
            <Blog
              image={category.image || "https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg"}
              title={category.name}
              subtitle="2 comments, 1 Like"
              text={category.description || "This is a wider card with supporting text below as a natural lead-in to additional content."}
              color="primary"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
