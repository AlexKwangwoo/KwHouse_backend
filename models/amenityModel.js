const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Provide name!'],
    maxlength: [30, 'Name must have less or equal then 20 characters']
  },

  description: {
    type: String,
    maxlength: [150, 'Description must have less or equal then 100 characters']
  }
});

const Amenity = mongoose.model('Amenity', amenitySchema);

module.exports = Amenity;
