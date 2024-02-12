const mongoose = require('mongoose');

const reviewRoomSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },

    overall_rating: {
      type: Number,
      min: 1,
      max: 5
    },

    value_rating: {
      type: Number,
      min: 1,
      max: 5
    },

    cleanliness_rating: { type: Number, min: 1, max: 5 },

    communication_rating: { type: Number, min: 1, max: 5 },

    location_rating: { type: Number, min: 1, max: 5 },

    accuracy_rating: { type: Number, min: 1, max: 5 },

    check_in_rating: { type: Number, min: 1, max: 5 },

    createdAt: {
      type: Date,
      default: Date.now
    },

    room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      required: [true, 'Review must belong to a room.']
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const reviewRoom = mongoose.model('ReviewRoom', reviewRoomSchema);

module.exports = reviewRoom;
