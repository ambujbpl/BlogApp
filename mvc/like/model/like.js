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

// static method to login user
likeSchema.statics.getLikesCountandType = async function(id,user_id) {
  const like = await this.find({blog_id:id,created_by:user_id});
  let response = {
    type: 0,
    likeCount: 0,
    disLikeCount: 0
  };
  if(like.length != 0) {
    response.type = like[0].type;
  }
  const likeCount = await this.count({blog_id:id,type:1});
  const disLikeCount = await this.count({blog_id:id,type:2});
  if(likeCount) response.response = response;
  if(disLikeCount) response.disLikeCount = disLikeCount;
  return response;
};

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;