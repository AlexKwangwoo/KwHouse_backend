const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const Amenity = require('./../models/amenityModel');

exports.getAllAmenities = factory.getAll(Amenity);
exports.getAmenity = factory.getOne(Amenity);
exports.createAmenity = factory.createOne(Amenity);
exports.updateAmenity = factory.updateOne(Amenity);
exports.deleteAmenity = factory.deleteOne(Amenity);
