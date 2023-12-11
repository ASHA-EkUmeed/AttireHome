import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

// Import product-related controller functions and authentication middleware

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';

// Define API routes for managing products

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);
export default router;
