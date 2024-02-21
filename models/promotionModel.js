const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Provide name!'],
    maxlength: [30, 'Name must have less or equal then 30 characters']
  },

  discount_rate: {
    type: Number,
    required: [true, 'discount_rate can not be empty!'],
    min: 1,
    max: 100
  },

  description: {
    type: String,
    required: [true, 'description can not be empty!']
  },

  start_date: {
    type: Date,
    required: [true, 'Start date can not be empty!']
  },

  end_date: {
    type: Date,
    required: [true, 'End date can not be empty!']
  }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
