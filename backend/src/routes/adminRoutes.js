const express = require('express');
const { getOrders, updateOrderStatus, getUsers } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

const router = express.Router();

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/users', getUsers);

module.exports = router;
