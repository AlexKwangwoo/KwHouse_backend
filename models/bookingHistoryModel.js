const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking must belong to booking history.']
  },

  service_fee: {
    type: Number,
    required: [true, 'service_fee can not be empty!'],
    min: 0
  },
  room_fee: {
    type: Number,
    required: [true, 'room_fee can not be empty!'],
    min: 0
  },
  cleaning_fee: {
    type: Number,
    required: [true, 'cleaning_fee can not be empty!'],
    min: 0
  },
  experience_fee: {
    type: Number,
    required: [true, 'experience_fee can not be empty!'],
    min: 0
  },
  tax: {
    type: Number,
    required: [true, 'tax can not be empty!'],
    min: 0
  },
  final_total_cost: {
    type: Number,
    required: [true, 'final_total_cost can not be empty!'],
    min: 0
  }
});

bookingHistorySchema.pre(/^find/, function(next) {
  // user 만 쓰면 전체다 나오는거 / path 주면 select 까지 선택가능! boooking 참고!
  this.populate({ path: 'booking', select: 'name status' });

  next();
});

const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

module.exports = BookingHistory;
