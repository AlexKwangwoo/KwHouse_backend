const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();
router
  .route('/')
  .get(notificationController.getAllNotifications)
  .post(notificationController.createNotification);

router
  .route('/:id')
  .get(notificationController.getNotification)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

module.exports = router;
