import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// Function to get paginated products with optional keyword search
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  // Construct a query based on the presence of a keyword in the request
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // Retrieve products based on the constructed query, considering pagination
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Send a JSON response containing products, current page, and total pages
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// Function to get a product by its ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If the product is found, return it; otherwise, return an error
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});

// Function to create a sample product
const createProduct = asyncHandler(async (req, res) => {
  // Create a new product with default values
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  // Save the created product and return it as JSON
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Function to update a product by its ID
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // Find the product by ID
  const product = await Product.findById(req.params.id);

  // If the product is found, update its details and return the updated product
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Function to delete a product by its ID
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If the product is found, delete it and return a success message
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Function to add a review to a product
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // Find the product by ID
  const product = await Product.findById(req.params.id);

  // If the product is found, check if the user has already reviewed it
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    // If already reviewed, return an error; otherwise, add the review
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // Update the number of reviews and average rating for the product
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Save the updated product
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Function to get the top-rated products
const getTopProducts = asyncHandler(async (req, res) => {
  // Find and return the top-rated products
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

// Export all functions for use in other modules
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
