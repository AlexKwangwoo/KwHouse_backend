const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const BookingHistory = require('../models/bookingHistoryModel');
const User = require('../models/userModel');

exports.getAllBookingHistories = factory.getAll(BookingHistory);
exports.getBookingHistory = factory.getOne(
  BookingHistory
  //   {
  //   path: 'user',
  //   // -room만 쓰면 안됨..
  //   select: 'name -wishlist id'
  // }
);
exports.createBookingHistory = factory.createOne(BookingHistory);
exports.updateBookingHistory = factory.updateOne(BookingHistory);
exports.deleteBookingHistory = factory.deleteOne(BookingHistory);

exports.approveBooking = catchAsync(async (req, res, next) => {
  console.log('eq.user', req.user);

  const checkBooking = await BookingHistory.findByIdAndUpdate(req.params.id);

  const updateUserBalance = res.status(201).json({
    status: 'success',
    data: {
      data: checkBooking
    }
  });
});
