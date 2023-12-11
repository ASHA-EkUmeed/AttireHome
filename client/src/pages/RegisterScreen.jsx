import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='heading fontstyle border-bottom pb-3' style={{color:'rgb(198, 79, 198)',textAlign:'center'}}>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group style={{marginTop: '0.8rem',marginBottom: '0.8rem'}} controlId='name'>
          <Form.Label><b>Name</b></Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            style={{border: '1px solid black'}}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group style={{marginTop: '0.8rem',marginBottom: '0.8rem'}} controlId='password'>
          <Form.Label><b>Password</b></Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            style={{border: '1px solid black'}}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group style={{marginTop: '0.8rem',marginBottom: '0.8rem'}}controlId='confirmPassword'>
          <Form.Label><b>Confirm Password</b></Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            style={{border: '1px solid black'}}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading}  type='submit' variant='primary'>
          Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row style={{paddingTop: '1.2rem',paddingBottom: '1.2rem'}}>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            <span style={{color:'blue'}}> Login</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
