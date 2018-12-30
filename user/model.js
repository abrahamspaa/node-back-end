const { Schema, model } = require('mongoose');

const user = new Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  roles: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = model('User', user);
