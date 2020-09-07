const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
module.exports = About;