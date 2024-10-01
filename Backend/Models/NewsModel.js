const mongoose = require('mongoose');

const mockupSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Mockup', mockupSchema);
