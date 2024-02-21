const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Promotion = require('../models/promotionModel');

exports.getAllPromotions = factory.getAll(Promotion);
exports.getPromotion = factory.getOne(Promotion);
exports.createPromotion = factory.createOne(Promotion);
exports.updatePromotion = factory.updateOne(Promotion);
exports.deletePromotion = factory.deleteOne(Promotion);
