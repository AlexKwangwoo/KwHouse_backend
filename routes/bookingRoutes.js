const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router.route('/:roomId/check').get(bookingController.checkBooking);

router.use(authController.protect);
// router.route('/:id/approve').patch(bookingController.approveBooking);

module.exports = router;
