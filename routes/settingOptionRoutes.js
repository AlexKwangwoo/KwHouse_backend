const express = require('express');
const settingOptionController = require('../controllers/settingOptionController');

const router = express.Router();
router
  .route('/')
  .get(settingOptionController.getAllSettingOptions)
  .post(settingOptionController.createSettingOption);

router
  .route('/:id')
  .get(settingOptionController.getSettingOption)
  .patch(settingOptionController.updateSettingOption)
  .delete(settingOptionController.deleteSettingOption);

module.exports = router;
