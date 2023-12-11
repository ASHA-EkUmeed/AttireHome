import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Set the default port or use the one provided in the environment
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded data in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies in the request
app.use(cookieParser());

// Routes for products, users, orders, and file uploads
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Endpoint to get PayPal client ID for payment configuration
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Serve uploaded files statically
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve the frontend build in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'frontend/build' directory
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // For any other routes, serve the frontend's 'index.html' file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  // For non-production environments, respond with 'running' for the root route
  app.get('/', (req, res) => {
    res.send('running');
  });
}

// Middleware for handling 404 Not Found errors
app.use(notFound);

// Middleware for handling general errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started at ${port}`));
