//express imported 
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  authUser,
  updateUserProfile,
  registerUser,
  logoutUser,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router

  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router

  .route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  
export default router;
