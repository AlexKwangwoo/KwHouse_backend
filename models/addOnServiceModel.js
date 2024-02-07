const mongoose = require('mongoose');

const addOnServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Provide name!'],
    maxlength: [30, 'Name must have less or equal then 20 characters']
  },

  description: {
    type: String,
    maxlength: [100, 'Description must have less or equal then 100 characters']
  }
});

const AddOnService = mongoose.model('AddOnService', addOnServiceSchema);

module.exports = AddOnService;
