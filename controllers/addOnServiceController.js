const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const AddOnService = require('../models/addOnServiceModel');

exports.getAllAddOnServices = factory.getAll(AddOnService);
exports.getAddOnService = factory.getOne(AddOnService);
exports.createAddOnService = factory.createOne(AddOnService);
exports.updateAddOnService = factory.updateOne(AddOnService);
exports.deleteAddOnService = factory.deleteOne(AddOnService);
