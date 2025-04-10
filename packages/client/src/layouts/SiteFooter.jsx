import React from 'react';
import footerLogo from '../assets/footer-logo.png';
import { Container } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
const SiteFooter = () => {
  return (
    <>
      <Container className="footer-container d-flex align-items-center justify-content-around">
        <div>
          <img src={footerLogo} alt="footer-logo" />
        </div>
        <p className="fs-5">New Casual Fation&copy; has all rights deserved.</p>
        <div className="d-flex gap-3">
          <Link>
            <i className="bi bi-twitter"></i>
          </Link>
          <Link>
            <i className="bi bi-facebook"></i>
          </Link>
          <Link>
            <i className="bi bi-instagram"></i>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default SiteFooter;
