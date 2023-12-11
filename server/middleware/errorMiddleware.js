// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
  // Create a new error with a descriptive message
  const error = new Error(`Not Found - ${req.originalUrl}`);
  
  // Set the HTTP status code to 404
  res.status(404);

  // Pass the error to the next middleware
  next(error);
};

// Middleware to handle general errors
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code based on the current response status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Use the error message from the thrown error
  let message = err.message;

  // If the error is a Mongoose CastError (e.g., invalid ObjectId), customize the error message and set status to 404
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Send a JSON response with the error details, including the message and stack trace (only in development)
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? 'MMM' : err.stack,
  });
};

// Export the middleware functions for use in other modules
export { notFound, errorHandler };
