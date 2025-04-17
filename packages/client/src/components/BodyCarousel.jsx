import React from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import trioBig from '../assets/trio-big.png';
import trioSmall1 from '../assets/trio-small1.png';
import trioSmall2 from '../assets/trio-small2.png';
import CarouselImage1 from '../assets/Carousel1.png';
import CarouselImage2 from '../assets/Carousel2.png';
import CarouselImage3 from '../assets/Carousel3.png';

const BodyCarousel = () => {
  return (
    <>
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
          <div className="my-2 text-center">
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
    </>
  );
};

export default BodyCarousel;
