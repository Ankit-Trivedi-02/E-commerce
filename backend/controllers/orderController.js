import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    couponApplied,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // Check and deduct stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        if (product.stock < item.qty) {
          res.status(400);
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        product.stock -= item.qty;
        await product.save();
      } else {
        res.status(404);
        throw new Error(`Product not found: ${item.name}`);
      }
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
      couponApplied,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('couponApplied', 'code discountPercentage');

  if (order) {
    // Check if the user is an admin or the owner of the order
    if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error('Not authorized to view this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name email')
    .sort({ createdAt: -1 });
  res.json(orders);
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderStatus, getOrders };
