const Order = require('../models/Order');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { services, serviceDate, totalAmount } = req.body;

    if (!services || services.length === 0) {
      return errorResponse(res, 'No order items', 'BAD_REQUEST', 400);
    }

    const order = new Order({
      user: req.user._id,
      services,
      serviceDate,
      totalAmount,
    });

    const createdOrder = await order.save();

    successResponse(res, createdOrder, 'Order created successfully', 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    successResponse(res, orders, 'User orders retrieved');
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 'Order not found', 'NOT_FOUND', 404);
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to cancel this order', 'FORBIDDEN', 403);
    }

    if (order.status !== 'PENDING') {
      return errorResponse(res, 'Only pending orders can be cancelled', 'BAD_REQUEST', 400);
    }

    order.status = 'CANCELLED';
    const updatedOrder = await order.save();

    successResponse(res, updatedOrder, 'Order cancelled successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  cancelOrder,
};