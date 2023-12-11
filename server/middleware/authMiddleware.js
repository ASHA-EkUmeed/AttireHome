import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

import asyncHandler from './asyncHandler.js';

// Middleware to protect routes - User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the JWT is present in the 'jwt' cookie
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    // If no token is found, return an error
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    // Verify the JWT and extract user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the authenticated user in the request object (excluding password)
    req.user = await User.findById(decoded.userId).select('-password');

    // Continue to the next middleware
    next();
  } catch (error) {
    // If JWT verification fails, log the error, return an error response
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  // Check if the user is authenticated and is an admin
  if (req.user && req.user.isAdmin) {
    // Continue to the next middleware
    next();
  } else {
    // If not an admin, return an error
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
