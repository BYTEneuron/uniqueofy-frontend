const Order = require('../models/Order');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id phone firstName lastName').sort({ createdAt: -1 });
    successResponse(res, orders, 'All orders retrieved');
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 'Order not found', 'NOT_FOUND', 404);
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        return errorResponse(res, 'Invalid status', 'BAD_REQUEST', 400);
    }

    // Strict Status Transitions
    const allowedTransitions = {
        PENDING: ['CONFIRMED', 'CANCELLED'],
        CONFIRMED: ['COMPLETED', 'CANCELLED'],
        COMPLETED: [], // Final state
        CANCELLED: [], // Final state
    };

    if (!allowedTransitions[order.status].includes(status)) {
        return errorResponse(
            res,
            `Cannot change status from ${order.status} to ${status}`,
            'INVALID_STATUS_TRANSITION',
            400
        );
    }

    order.status = status;
    const updatedOrder = await order.save();

    successResponse(res, updatedOrder, 'Order status updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        successResponse(res, users, 'All users retrieved');
    } catch (error) {
        next(error);
    }
};

module.exports = {
  getOrders,
  updateOrderStatus,
  getUsers,
};
