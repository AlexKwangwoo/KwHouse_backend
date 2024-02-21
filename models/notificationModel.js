const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Provide notification type!'],
    maxlength: [100, 'Name must have less or equal then 100 characters']
  },

  name: {
    type: String,
    unique: true,
    required: [true, 'Provide name!'],
    maxlength: [30, 'Name must have less or equal then 30 characters']
  },

  is_read: {
    type: Boolean,
    default: false
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', //User 여기껀 import필요없다 이렇게는 referencing
    required: [true, 'Notification need a user']
  },

  detail: { type: String, required: [true, 'Detail can not be empty!'] }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
