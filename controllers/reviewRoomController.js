const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const ReviewRoom = require('../models/reviewRoomModel');

exports.getAllreviewsRoom = factory.getAll(ReviewRoom);
exports.getReviewRoom = factory.getOne(ReviewRoom);
exports.createReviewRoom = factory.createOne(ReviewRoom);
exports.updateReviewRoom = factory.updateOne(ReviewRoom);
exports.deleteReviewRoom = factory.deleteOne(ReviewRoom);

exports.createReviewRoom2 = catchAsync(async (req, res, next) => {
  const checkExist = await ReviewRoom.find({
    $and: [
      {
        user: req.body.user
      },
      {
        room: req.body.room
      }
    ]
  });

  if (checkExist.length > 0) {
    return next(
      new AppError('This user already has a review for this room', 409)
    );
  }
  const doc = await ReviewRoom.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
