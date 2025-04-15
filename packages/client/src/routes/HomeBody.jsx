import CarouselImage1 from '../assets/Carousel1.png';
import CarouselImage2 from '../assets/Carousel2.png';
import CarouselImage3 from '../assets/Carousel3.png';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import trioBig from '../assets/trio-big.png';
import trioSmall1 from '../assets/trio-small1.png';
import trioSmall2 from '../assets/trio-small2.png';
// import newImg1 from '../assets/newImg1.png';
// import newImg2 from '../assets/newImg2.png';
// import newImg3 from '../assets/newImg3.png';
// import newImg4 from '../assets/newImg4.png';
// import newImg5 from '../assets/newImg5.png';
// import newImg6 from '../assets/newImg6.png';
// import newImg7 from '../assets/newImg7.png';
// import newImg8 from '../assets/newImg8.png';
// import newImg9 from '../assets/newImg9.png';
// import newImg10 from '../assets/newImg10.png';
import '../App.css';

function HomeBody() {
  return (
    <>
      <Container className="my-3">
        <h2>공사중</h2>
        <Row>
          <Col md={6}>
            <Carousel fade>
              <Carousel.Item>
                <div className="img-fluid text-center">
                  <img
                    src={CarouselImage1}
                    alt="carousel1"
                    text="First slide"
                    className="carousel-imgs"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="img-fluid text-center">
                  <img
                    src={CarouselImage2}
                    alt="carousel2"
                    text="Second slide"
                    className="carousel-imgs"
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="img-fluid text-center">
                  <img
                    src={CarouselImage3}
                    alt="carousel3"
                    text="Third slide"
                    className="carousel-imgs"
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={6}>
            <div className='my-2 text-center'>
              <img src={trioBig} alt="triobig" />
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <div>
                <img src={trioSmall1} alt="triosmall1" />
              </div>
              <div>
                <img src={trioSmall2} alt="triosmall2" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="my-3">
        {/* <Row className="text-center">
          <Col md={12}>
            <h2>New Arrivals</h2>
          </Col>
          <Col md={12}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, excepturi.</p>
          </Col>
        </Row> */}
        {/* <Row className="my-3 gap-5 d-flex align-items-center justify-content-around">
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg1} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg3} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg3} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg4} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
        </Row> */}
        {/* <Row className="my-3 gap-5 d-flex align-items-center justify-content-around">
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg6} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg7} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg8} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
          <Col xs={3} sm={3} md={2} className="posi-rel">
            <img src={newImg9} alt="홈이미지" className="new-arr-imgs img-fluid" />
            <span className="new-items posi-ab">New!</span>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default HomeBody;
