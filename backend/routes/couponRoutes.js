import express from 'express';
import { createCoupon, validateCoupon, getCoupons, deleteCoupon } from '../controllers/couponController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route('/:id').delete(protect, admin, deleteCoupon);
router.post('/validate', protect, validateCoupon);

export default router;
