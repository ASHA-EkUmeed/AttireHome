import Order from '../models/orderModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// Function to add new order items
const addOrderItems = asyncHandler(async (req, res) => {
  // Destructure relevant data from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if there are order items; if not, return an error
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // Create a new order with modified order items and other details
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the order and return the created order as JSON
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//  Function to get an order by its ID
const getOrderById = asyncHandler(async (req, res) => {
  // Find the order by ID and populate user details
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  // If the order is found, return it; otherwise, return an error
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Function to update an order as "paid"
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  // If the order is found, update payment details and return the updated order
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// BEST PRACTICE: Function to update an order as "delivered"
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  // If the order is found, update delivery details and return the updated order
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Function to get orders associated with the authenticated user
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// Function to get all orders, populated with user details
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

// Export the functions for use in other modules
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
