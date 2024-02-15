const express = require('express');
const reviewRoomController = require('../controllers/reviewRoomController');

const router = express.Router();
router
  .route('/')
  .get(reviewRoomController.getAllreviewsRoom)
  .post(reviewRoomController.createReviewRoom2);

router
  .route('/:id')
  .get(reviewRoomController.getReviewRoom)
  .patch(reviewRoomController.updateReviewRoom)
  .delete(reviewRoomController.deleteReviewRoom);

module.exports = router;
