const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express app
const app = express();
const config = require('./config/config');

// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Auth Routes
const authRoutes = require('./mvc/auth/route/authRoutes');
// Blogs Routes
const blogRoutes = require('./mvc/blog/route/blogRoutes');
// About Routes
const aboutRoutes = require('./mvc/about/route/aboutRoutes');
// Like Routes
const likeRoutes = require('./mvc/like/route/likeRoutes');

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(config.port);
    console.log(`Node MongoBlog Application running on ${config.port}`);
  })
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views','./public/views');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => {
  res.redirect('/blogs');
  // res.render('home', { title: 'Home blogs' });
});

// auth routes
app.use(authRoutes);
// blog routes
app.use('/blogs', requireAuth, blogRoutes);
// about routes
app.use('/about', requireAuth, aboutRoutes);
// like routes
app.use('/like', requireAuth, likeRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('error/404', { title: '404' });
});



// app.get('/set-cookies', (req, res) => {

//   // res.setHeader('Set-Cookie', 'newUser=true');
  
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
//   res.cookie('isLogin', true, { maxAge: 1000 * 60 * 60 * 24, secure: true });
//   res.send('you got the cookies!');
// });

// app.get('/get-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);
// });