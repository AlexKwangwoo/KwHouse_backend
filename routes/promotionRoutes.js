const express = require('express');
const promotionController = require('../controllers/promotionController');

const router = express.Router();
router
  .route('/')
  .get(promotionController.getAllPromotions)
  .post(promotionController.createPromotion);

router
  .route('/:id')
  .get(promotionController.getPromotion)
  .patch(promotionController.updatePromotion)
  .delete(promotionController.deletePromotion);

module.exports = router;
