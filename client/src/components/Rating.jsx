import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Rating component that displays star icons based on the provided 'value' (rating) and 'color' (optional)
const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span style={{ margin: '0.1rem'}}>
        {value >= 1 ? (
          <FaStar style={{Color:'black'}} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt  />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar style={{color:'black'}} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{color:'black'}} />
        ) : (
          <FaRegStar style={{color:'black'}} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar style={{color:'black'}} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{color:'black'}} />
        ) : (
          <FaRegStar style={{color:'black'}} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar style={{color:'black'}} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{color:'black'}} />
        ) : (
          <FaRegStar style={{color:'black'}} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar style={{color:'black'}} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{color:'black'}} />
        ) : (
          <FaRegStar style={{color:'black'}} />
        )}
      </span>
      <span className='rating-text' 
      style={{ fontSize: '0.8rem',fontWeight: '600',paddingLeft: '0.5rem'}}>{text && text}</span>
    </div>
  );
};


export default Rating;
