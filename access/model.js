const { Schema, model } = require('mongoose');

const access = new Schema({
   _id: Schema.Types.ObjectId,
   email: {
     type: String,
     required: true,
     trim: true
   },
   password: {
     type: String,
     required: true,
     trim: true
   }
});

module.exports = model('Access', access);
