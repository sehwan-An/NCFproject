import React from 'react'
import { Container } from 'react-bootstrap'
// import Mensimge from '../assets/aboutus/MensShop.png'
// import Womensimg from '../assets/aboutus/WomensShop.png'
import Studiopng from '../assets/about-us-image.png'



import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'





function AboutImage() {
  return (
    
    <>
      <Container className='d-flex gap-3 justify-content-center align-items-center my-3'>
        {/* <img src={Mensimge} alt="MensShopimg.png" className='about-img-size' /> */}
        {/* <img src={Womensimg} alt="WomensShopimg.png" className='about-img-size' /> */}
        <img src={Studiopng} alt="Studioimg.png" className='about-img-size' />
        
      </Container>
    </>


    
  )
}

export default AboutImage