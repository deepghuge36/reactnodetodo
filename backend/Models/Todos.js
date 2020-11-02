const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default:Date.now
  }
});

module.exports = mongoose.model('todo',TodoSchema)