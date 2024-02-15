const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: [true, 'Provide feedback name!'],
    maxlength: [100, 'Name must have less or equal then 100 characters']
  },

  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', //User 여기껀 import필요없다 이렇게는 referencing
    required: [true, 'Feedback need a user']
  },

  detail: { type: String, required: [true, 'Detail can not be empty!'] }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
