const User = require('./../model/user');
const config = require('./../../../config/config');
const jwt = require('jsonwebtoken');

/**
 * { signup get function }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const signup_get = (req, res) => {
  res.render('auth/signup', { title: 'Signup' });
}

/**
 * { login get function }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const login_get = (req, res) => {
  res.render('auth/login', { title: 'Login' });
}

/**
 * { signup post function }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: config.maxAge * 1000 });// cookies max time will be milisecond that's why multiply by 1000
    res.status(201).json({user: user._id});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

/**
 * { login post function }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('user_id', user._id, { httpOnly: true, maxAge: config.maxAge * 1000 });// cookies max time will be milisecond that's why multiply by 1000
    res.cookie('jwt', token, { httpOnly: true, maxAge: config.maxAge * 1000 });// cookies max time will be milisecond that's why multiply by 1000
    res.status(200).json({ success:true, user: user._id, message: 'You are successfully logged in' });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

/**
 * { logout function }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = {
  signup_get, 
  login_get, 
  signup_post, 
  login_post, 
  logout_get
} 

/**
 * { handle Errors }
 *
 * @param      {<type>}  err     The error
 * @return     {<type>}  { description_of_the_return_value }
 */
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { name: '', email: '', password: '' };
  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }
  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }
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

/**
 * Creates a json web token.
 *
 * @param      {<type>}  id      The identifier
 * @return     {<type>}  { description_of_the_return_value }
 */
const createToken = (id) => {
  return jwt.sign({ id }, config.secret , {
    expiresIn: config.maxAge
  });
};