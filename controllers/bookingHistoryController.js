const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const BookingHistory = require('../models/bookingHistoryModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

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
  // booking id

  if (req.user.balance < req.body.final_total_cost) {
    res.status(500).json({
      status: 'error',
      message: 'The user does not have enough balance'
    });
  }
  const leftBalance = req.user.balance - req.body.final_total_cost;
  console.log('leftBalance', leftBalance);
  await User.findByIdAndUpdate(
    req.user.id,
    {
      balance: leftBalance
    },
    {
      new: true, //new 업데이트된 오브젝트를 리턴할것임
      runValidators: true
    }
  );

  await Booking.findByIdAndUpdate(req.params.id, {
    status: 'ongoing'
  });

  const doc = await BookingHistory.create({
    ...req.body,
    booking: req.params.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
