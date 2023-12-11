import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className='fontstyle border-bottom pb-3' style={{color:'rgb(198, 79, 198)',textAlign:'center'}}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group style={{marginTop:'20px'}} controlId='address'>
          <Form.Label><b>Address :</b></Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            style={{border:'1px solid black',marginTop:'0.5rem',marginBottom:'0.5rem'}}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group style={{marginTop:'20px'}}  controlId='city'>
          <Form.Label><b>City :</b></Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            style={{border:'1px solid black',marginTop:'0.5rem',marginBottom:'0.5rem'}}
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group style={{marginTop:'20px'}} controlId='postalCode'>
          <Form.Label><b>Postal Code :</b></Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            style={{border:'1px solid black',marginTop:'0.5rem',marginBottom:'0.5rem'}}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group style={{marginTop:'20px'}} controlId='country'>
          <Form.Label><b>Country :</b></Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            style={{border:'1px solid black',marginTop:'0.5rem',marginBottom:'1rem'}}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'
        style={{backgroundColor:'blue',marginBottom:'1rem'}}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
