const Like = require('./../model/like');

/**
 * { Blog Like Post }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_like_post = async (req, res) => {
  try {
    req.body.created_by = req.cookies.user_id;
    let likeResult = await Like.find({blog_id:req.body.blog_id,created_by:req.body.created_by});
    if (likeResult.length == 0) {
      const like = new Like(req.body);
      await like.save()
    } else {
      await Like.findByIdAndUpdate({_id:likeResult[0]._id},{"type": req.body.type});
    }
    res.json({success:true,message:`like updated successfully`});
  } catch (err) {
    console.log(err);
  };
}

module.exports = {
  blog_like_post
}