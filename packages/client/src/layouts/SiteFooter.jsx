import React from 'react';
import footerLogo from '../assets/footer-logo.png';
import { Container } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
const SiteFooter = () => {
  return (
    <>
      <Container className="footer-container d-flex align-items-center justify-content-around" fluid>
        <div className='footer-box1'>
          <img src={footerLogo} alt="footer-logo" />
        </div>
        <p className="footer-box2 fs-5">New Casual Fashion&copy; has all rights deserved.</p>
        <div className="footer-box3 d-flex gap-3">
          <Link>
            <i className="bi bi-twitter icon-white"></i>
          </Link>
          <Link>
            <i className="bi bi-facebook icon-white"></i>
          </Link>
          <Link>
            <i className="bi bi-instagram icon-white"></i>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default SiteFooter;
