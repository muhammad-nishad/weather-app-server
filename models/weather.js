const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  city: String,
  temperature: Number,
  description: String,
  icon: String,
  date: String,
});

module.exports = mongoose.model('Weather', WeatherSchema);
