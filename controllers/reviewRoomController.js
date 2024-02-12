const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const ReviewRoom = require('../models/reviewRoomModel');

exports.getAllreviewsRoom = factory.getAll(ReviewRoom);
exports.getReviewRoom = factory.getOne(ReviewRoom);
exports.createReviewRoom = factory.createOne(ReviewRoom);
exports.updateReviewRoom = factory.updateOne(ReviewRoom);
exports.deleteReviewRoom = factory.deleteOne(ReviewRoom);
