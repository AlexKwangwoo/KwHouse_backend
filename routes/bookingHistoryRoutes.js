const express = require('express');
const bookingHistoryController = require('../controllers/bookingHistoryController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(bookingHistoryController.getAllBookingHistories)
  .post(bookingHistoryController.createBookingHistory);
router
  .route('/:id')
  .get(bookingHistoryController.getBookingHistory)
  .patch(bookingHistoryController.updateBookingHistory)
  .delete(bookingHistoryController.deleteBookingHistory);

router.use(authController.protect);
router.route('/:id/approve').patch(bookingHistoryController.approveBooking);

module.exports = router;
