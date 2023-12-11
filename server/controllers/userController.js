import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// Function to authenticate a user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // If the user exists and the password is a match, generate a token and send user info
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If authentication fails, return an error
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  // If user already exists, return an error; otherwise, create the user
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created, generate a token and send user info
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If user creation fails, return an error
    res.status(400);
    throw new Error('Invalid data');
  }
});

// Function to log out a user by clearing the JWT cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Log out successfully' });
});

// Function to get user profile details
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // If the user is found, return user info; otherwise, return an error
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to update user profile details
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // If the user is found, update user details and return the updated user info
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // If the user is not found, return an error
    res.status(404);
    throw  new Error('User not found');
  }
});

// Function to get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Function to get a user by ID (excluding password)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  // If the user is found, return user info; otherwise, return an error
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // If the user is found, check if it is an admin (admins cannot be deleted)
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }

    // Delete the user and return a success message
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    // If the user is not found, return an error
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to update a user by ID
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // If the user is found, update user details and return the updated user info
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // If the user is not found, return an error
    res.status(404);
    throw new Error('User not found');
  }
});

// Export all functions for use in other modules
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
