const Order = require('../models/Order');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @desc    Create a new service request (Order)
 * @route   POST /api/orders
 * @access  Private (User)
 */
const createOrder = async (req, res, next) => {
  try {
    const { services, serviceDate, address, timeSlot, note } = req.body;

    if (!services || services.length === 0) {
      return errorResponse(res, 'No services selected', 'BAD_REQUEST', 400);
    }

    if (!serviceDate) {
      return errorResponse(res, 'Service date is required', 'BAD_REQUEST', 400);
    }

    if (!address) {
      return errorResponse(
        res,
        'Address is required',
        'BAD_REQUEST',
        400
      );
    }

    if (!timeSlot) {
      return errorResponse(
        res,
        'Preferred time slot is required',
        'BAD_REQUEST',
        400
      );
    }    

    // Map services to ensure we only store allowed fields (excluding pricing)
    const orderItems = services.map((item) => ({
      serviceId: item.serviceId,
      name: item.name,
      quantity: item.quantity || 1,
    }));

    const order = new Order({
      user: req.user._id,
      services: orderItems,
      serviceDate: new Date(serviceDate),
      address,
      timeSlot,
      note: note || '', // Optional field
      // status defaults to 'pending_review'
      // finalAmount defaults to null
      // isAmountFinalized defaults to false
      // paymentStatus defaults to 'unpaid'
    });

    const createdOrder = await order.save();

    return successResponse(
      res,
      createdOrder,
      'Order request created successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private (User)
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('user', 'firstName lastName phone')
      .sort({ createdAt: -1 });

    return successResponse(res, orders, 'User orders retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel an order (only if pending review)
 * @route   PUT /api/orders/:id/cancel
 * @access  Private (User)
 */
const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 'Order not found', 'NOT_FOUND', 404);
    }

    // specific user check
    if (order.user.toString() !== req.user._id.toString()) {
      return errorResponse(
        res,
        'Not authorized to cancel this order',
        'FORBIDDEN',
        403
      );
    }

    if (order.status !== 'pending_review') {
      return errorResponse(
        res,
        'Only orders pending review can be cancelled',
        'BAD_REQUEST',
        400
      );
    }

    order.status = 'cancelled';
    const updatedOrder = await order.save();

    return successResponse(res, updatedOrder, 'Order cancelled successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Finalize order quote (Admin only)
 * @route   PUT /api/admin/orders/:id/finalize
 * @access  Private (Admin)
 */
const finalizeQuote = async (req, res, next) => {
  try {
    const { finalAmount } = req.body;

    if (!finalAmount || isNaN(finalAmount) || Number(finalAmount) <= 0) {
      return errorResponse(
        res,
        'Final amount is required',
        'BAD_REQUEST',
        400
      );
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorResponse(res, 'Order not found', 'NOT_FOUND', 404);
    }

    // Update order with final quote
    order.finalAmount = Number(finalAmount);
    order.isAmountFinalized = true;
    order.status = 'quote_finalized';

    const updatedOrder = await order.save();

    return successResponse(
      res,
      updatedOrder,
      'Order quote finalized successfully'
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  cancelOrder,
  finalizeQuote,
};
