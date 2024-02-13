const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();
router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router.route('/category').get(roomController.getRoomByCate);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

router
  .route('/:id/pictures')
  .patch(
    roomController.uploadRoomImages,
    roomController.insertRoomImagesLinks,
    roomController.updatePictureToRoom
  );

module.exports = router;
