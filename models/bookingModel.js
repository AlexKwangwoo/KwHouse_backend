const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['room', 'experiences'],
    default: 'room'
  },

  guests: {
    type: Number,
    required: [true, 'guests can not be empty!'],
    min: 1,
    max: 100
  },

  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: [true, 'Room must belong to a booking.']
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User must belong to a booking']
  },

  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'canceled'],
    default: 'pending'
  },

  check_in: {
    type: Date,
    required: [true, 'check in date can not be empty!']
  },

  check_out: {
    type: Date,
    required: [true, 'check out date can not be empty!']
  }
});

bookingSchema.pre(/^find/, function(next) {
  // user 만 쓰면 전체다 나오는거 / path 주면 select 까지 선택가능! boooking 참고!
  this.populate({ path: 'user', select: 'name -wishlist id' }).populate({
    path: 'room',
    select: 'name -amenities id'
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
