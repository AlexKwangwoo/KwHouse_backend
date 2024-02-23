const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(
  Booking
  //   {
  //   path: 'user',
  //   // -room만 쓰면 안됨..
  //   select: 'name -wishlist id'
  // }
);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

// 21 22
// 22~23 일 없음
// 23 24 25
exports.checkBooking = catchAsync(async (req, res, next) => {
  const checkExist = await Booking.find({
    $and: [
      {
        $and: [
          {
            check_in: { $lt: new Date(req.query.check_out).toISOString() }
          },
          {
            check_out: { $gt: new Date(req.query.check_in).toISOString() }
          }
        ]
      },

      {
        room: req.params.roomId
      }
    ]
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: { ok: !(checkExist.length > 0) }
    }
  });
});

// exports.approveBooking = catchAsync(async (req, res, next) => {
//   console.log('eq.user', req.user);

//   const checkBooking = await Booking.findByIdAndUpdate(req.params.id);

//   const updateUserBalance =

//   res.status(201).json({
//     status: 'success',
//     data: {
//       data: checkBooking
//     }
//   });
// });
