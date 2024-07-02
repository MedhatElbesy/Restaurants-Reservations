import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const About = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <Row className="justify-content-center">
      <Col lg={6} >
        <Card className="my-5"
        onClick={handleCardClick}
        style={{
          backgroundColor: '#fcdb94',
          boxShadow: isClicked ? '0 4px 8px rgba(255, 255, 255, 0.2)' : 'none',
          transition: 'box-shadow 0.3s ease',height:'500'
        }}
        
        >
          <CardBody sx={{bgcolor: '#fcdb94'}}>
            <CardTitle tag="h6" className="border-bottom pb-3 mb-3">
              <i className="bi bi-bell me-2"></i>
              About Restaurant
            </CardTitle>
            <Row className="text-center">
              <Col>
                <div className="m-5">
                  <Card>
                    <img 
                      src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg" 
                      alt="Restaurant" 
                      className="w-100" 
                      height="400"
                    />
                    <CardBody>
                      <CardTitle tag="h5" className="text-dark">
                        Our Restaurant
                      </CardTitle>
                      <CardText className="text-secondary">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </CardText>
                      <Button  sx={{color: '#fcdb94'}} href="/" target="_blank">
                        More Details
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
