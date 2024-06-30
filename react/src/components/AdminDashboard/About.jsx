import { Row, Col, CardTitle, Button, CardSubtitle, Card } from 'reactstrap';
// import ComponentCard from '../components/ComponentCard';
// import about from '../assets/images/bg/img1.jpg'

const About = () => {
  
  return (
    <Row>
      <Col>
        <Card className='w-50'>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0 ">
            <i className="bi bi-bell me-2"> </i>
            About Resturant
          </CardTitle>

          <Row className='d-flex text-center'>
            <Col >
              <div className="m-5">
                <Card
                  title="Our Restua Restuarnt"
                  subtitle={
                    <h5 className='text-dark'>
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </h5>
                  }
                >
                  <img src="https://media.architecturaldigest.com/photos/572a34ffe50e09d42bdfb5e0/master/pass/japanese-restaurants-la-01.jpg" alt="pro version" className="w-100" height="600"/>

                  <div className="mt-3">
                    <Button
                      color="primary"
                      href="/"
                      target="_blank"
                    >
                      More Details
                    </Button>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>

        </Card>
      </Col>
    </Row>
  );
};

export default About;
