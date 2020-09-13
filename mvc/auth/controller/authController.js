const User = require('./../model/user');

// const blog_index = (req, res) => {
//   User.find().sort({ createdAt: -1 })
//     .then(result => {
//       res.render('index', { blogs: result, title: 'All blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// const blog_details = (req, res) => {
//   const id = req.params.id;
//   User.findById(id)
//     .then(result => {
//       res.render('details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//       res.render('404', { title: 'Blog not found' });
//     });
// }

// const blog_create_get = (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// }

// const blog_create_post = (req, res) => {
//   const blog = new User(req.body);
//   blog.save()
//     .then(result => {
//       res.redirect('/blogs');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// const blog_delete = (req, res) => {
//   const id = req.params.id;
//   User.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// module.exports = {
//   blog_index, 
//   blog_details, 
//   blog_create_get, 
//   blog_create_post, 
//   blog_delete
// }
// 

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { name: '', email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup', { title: 'Signup' });
}

module.exports.login_get = (req, res) => {
  res.render('login', { title: 'Login' });
}

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}