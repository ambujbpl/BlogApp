const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  blog_id: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;