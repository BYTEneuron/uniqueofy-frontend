const express = require('express');
const {
  getOrders,
  updateOrderStatus,
  getUsers,
} = require('../controllers/adminController');

const { finalizeQuote } = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

const router = express.Router();

// ======================================================
// All admin routes require authentication + admin role
// ======================================================
router.use(protect);
router.use(authorize('admin'));

// ======================================================
// Admin Order Management
// ======================================================
router.get('/orders', getOrders);

// Admin updates generic order status (existing logic)
router.put('/orders/:id/status', updateOrderStatus);

// 🔥 Admin finalizes pricing (new production flow)
router.put('/orders/:id/finalize', finalizeQuote);

// ======================================================
// Admin User Management
// ======================================================
router.get('/users', getUsers);

module.exports = router;
