import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BodyCarousel from '../components/BodyCarousel.jsx'
import BodyNewShow from '../components/BodyNewShow.jsx'

function HomeBody() {
  const [products, setProducts ] = useState([]);
  useEffect(() => {
    try {
      axios
        .get('http://localhost:3000/api/products', {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res)
          if(res) {
            setProducts(res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  }, [])
  return (
    <>
      <Container className="my-3">
        {!products && <h2>공사중</h2>}
        <BodyCarousel />
      </Container>
      <Container className="my-3">
        <BodyNewShow products={products} />
      </Container>
    </>
  );
}

export default HomeBody;
