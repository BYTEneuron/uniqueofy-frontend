const express = require('express');
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { createServiceSchema, updateServiceSchema } = require('../validators/serviceSchemas');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);

router.post(
  '/',
  protect,
  authorize('admin'),
  validate(createServiceSchema),
  createService
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  validate(updateServiceSchema),
  updateService
);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
