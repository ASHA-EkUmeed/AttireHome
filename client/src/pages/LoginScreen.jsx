import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='heading border-bottom pb-3 fontstyle' style={{color:'rgb(198, 79, 198)',textAlign:'center'}}>Log In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group style={{marginTop: '0.8rem',marginBottom: '0.8rem'}} controlId='email'>
          <Form.Label><b>Email Address</b></Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            style={{border: '1px solid black'}}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            style={{border: '1px solid black'}}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          style={{marginTop: '0.6rem',
            backgroundColor: 'rgb(70, 60, 255)',
            width: '39vw'}}
          variant='primary'
        >
          Log In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row style={{paddingTop: '1.2rem',paddingBottom: '1.2rem'}}>
        <Col>
          Dont have an account ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
           <span style={{color:'blue'}}> Register</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
