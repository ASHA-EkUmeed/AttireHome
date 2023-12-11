import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
// Set a default value for the 'variant' prop if it's not provided
Message.defaultProps = {
  variant: 'info',
};

export default Message;
