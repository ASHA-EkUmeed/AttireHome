//handling exceptions in asynchronous functions and passing them to'next' middleware

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
