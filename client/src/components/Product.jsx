import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
     style={{ marginTop: '13px',marginBottom: '1.2rem'}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img style={{height:'40vh'}} src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title' style={{  height: '2.5em',overflow: 'hidden',textOverflow:'ellipsis' }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h4'>From &#8377; {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
