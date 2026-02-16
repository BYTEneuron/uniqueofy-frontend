const Order = require('../models/Order');

// @desc    Create new booking
// @route   POST /api/orders/create
// @access  Private
const createOrder = async (req, res) => {
    const { services, serviceDate, address, notes, amount } = req.body;

    const order = await Order.create({
        user: req.user._id,
        services,
        serviceDate,
        address,
        notes,
        amount
    });

    res.status(201).json(order);
};

// @desc    Get logged-in user's bookings
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Mark payment as ready (Admin simulation)
// @route   POST /api/orders/:id/mark-payment-ready
// @access  Public (or Private/Admin)
const markPaymentReady = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.paymentReady = true;
        await order.save();
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

module.exports = { createOrder, getMyOrders, markPaymentReady };