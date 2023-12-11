import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// SearchBox component for searching products
const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);

    // Handler for the search form submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{display: 'flex'}}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        style={{border: '1px solid black'}}
        value={keyword}
        placeholder='Search Products...'
      ></Form.Control>
      <Button type='submit' variant='outline-light' 
       style={{ padding: '0.6rem',border:'1px solid black',backgroundColor:'white',
       color:'black',  marginRight: '0.6rem',marginLeft: '0.6rem'}}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
