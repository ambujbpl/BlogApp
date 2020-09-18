const Blog = require('./../model/blog');
const Like = require('./../../like/model/like');
/**
 * { blog index }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_index = async (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then( async result => {
      for(let i=0; i<result.length; i++) {
        // result.forEach(blog => {
        let likeResult = await Like.find({blog_id:result[i]._id,created_by:req.cookies.user_id})
        console.log(`${result[i]._id} : likeResult = `,likeResult);
        if(likeResult.length == 0) {
          result[i].like = 0;
        } else {
          result[i].like = likeResult[0].type;
        }
      }
      console.log('result : ',result);
      res.render('blog/index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * { blog details }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blog/details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('error/404', { title: 'Blog not found' });
    });
}

/**
 * { blog create get }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_create_get = (req, res) => {
  res.render('blog/create', { title: 'Create a new blog' });
}

/**
 * { blog_create_post }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_create_post = (req, res) => {
  req.body.created_by = req.cookies.user_id;
  console.log('req.body : ',req.body)
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * { blog delete }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}