import asyncHandler from 'express-async-handler';
import Coupon from '../models/Coupon.js';

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discountPercentage, expiryDate } = req.body;

  const couponExists = await Coupon.findOne({ code });

  if (couponExists) {
    res.status(400);
    throw new Error('Coupon code already exists');
  }

  const coupon = new Coupon({
    code,
    discountPercentage,
    expiryDate,
  });

  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
});

// @desc    Validate a coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    res.status(404);
    throw new Error('Coupon not found');
  }

  if (!coupon.isActive || new Date(coupon.expiryDate) < new Date()) {
    res.status(400);
    throw new Error('Coupon is inactive or expired');
  }

  res.json(coupon);
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  if (coupon) {
    await coupon.deleteOne();
    res.json({ message: 'Coupon removed' });
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

export { createCoupon, validateCoupon, getCoupons, deleteCoupon };
