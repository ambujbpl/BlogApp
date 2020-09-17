const Like = require('./../model/like');

/**
 * { Blog Like Post }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_like_post = (req, res) => {
  req.body.created_by = req.cookies.user_id;
  console.log('req.body : ',req.body)
  const like = new Like(req.body);
  like.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_like_post
}