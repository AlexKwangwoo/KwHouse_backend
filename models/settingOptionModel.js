const mongoose = require('mongoose');

const settingOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    unique: false,
    required: [true, 'Provide type!'],
    maxlength: [50, 'Name must have less or equal then 50 characters']
  },

  name: {
    type: String,
    unique: false,
    required: [true, 'Provide name!'],
    maxlength: [50, 'type must have less or equal then 50 characters']
  },

  detail: {
    type: String
  }
});

const SettingOption = mongoose.model('SettingOption', settingOptionSchema);

module.exports = SettingOption;
