const express = require('express');
const addOnServiceController = require('../controllers/addOnServiceController');

const router = express.Router();
router
  .route('/')
  .get(addOnServiceController.getAllAddOnServices)
  .post(addOnServiceController.createAddOnService);

router
  .route('/:id')
  .get(addOnServiceController.getAddOnService)
  .patch(addOnServiceController.updateAddOnService)
  .delete(addOnServiceController.deleteAddOnService);

module.exports = router;
