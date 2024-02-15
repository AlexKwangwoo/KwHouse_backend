const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Feedback = require('../models/feedbackModel');

exports.getAllFeedbacks = factory.getAll(Feedback, {
  path: 'user',
  select: 'name profile_img'
});
exports.getFeedback = factory.getOne(Feedback, {
  path: 'user',
  select: 'name profile_img'
});
exports.createFeedback = factory.createOne(Feedback);
exports.updateFeedback = factory.updateOne(Feedback);
exports.deleteFeedback = factory.deleteOne(Feedback);
