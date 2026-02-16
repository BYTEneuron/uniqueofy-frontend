const express = require('express');
const { createOrder, getMyOrders, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { createOrderSchema } = require('../validators/orderSchemas');

const router = express.Router();

router.post('/', protect, validate(createOrderSchema), createOrder);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;