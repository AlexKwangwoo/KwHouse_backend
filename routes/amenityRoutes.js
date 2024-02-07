const express = require('express');
const amenityController = require('./../controllers/amenityController');

const router = express.Router();
router
  .route('/')
  .get(amenityController.getAllAmenities)
  .post(amenityController.createAmenity);

router
  .route('/:id')
  .get(amenityController.getAmenity)
  .patch(amenityController.updateAmenity)
  .delete(amenityController.deleteAmenity);

module.exports = router;
