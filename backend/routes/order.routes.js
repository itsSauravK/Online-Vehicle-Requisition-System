const express = require('express');
const router = express.Router();

const { auth, admin } = require('../middleware/auth.middleware');

const {
  placeOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  reviewOrder,
  payOrder,
  dispatchOrder,
} = require('../controllers/order.controllers');

router.route('/').post(auth, placeOrder).get(auth, admin, getAllOrders);

router.get('/my', auth, getMyOrders);

router.post('/:id/review', auth, admin, reviewOrder);

router.post('/:id/pay', auth, payOrder);
router.post('/:id/dispatch', auth, admin, dispatchOrder);

router.route('/:id').get(auth, getOrderById);

module.exports = router;
