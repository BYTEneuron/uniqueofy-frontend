const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, markPaymentReady } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.post('/:id/mark-payment-ready', markPaymentReady);

module.exports = router;