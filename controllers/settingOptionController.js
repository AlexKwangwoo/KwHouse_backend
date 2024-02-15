const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const SettingOption = require('../models/settingOptionModel');

exports.getAllSettingOptions = factory.getAll(SettingOption);
exports.getSettingOption = factory.getOne(SettingOption);
exports.createSettingOption = factory.createOne(SettingOption);
exports.updateSettingOption = factory.updateOne(SettingOption);
exports.deleteSettingOption = factory.deleteOne(SettingOption);
