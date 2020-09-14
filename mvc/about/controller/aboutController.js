const About = require('../model/about');

/**
 * { about }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const about = (req, res) => {
  About.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('about/about', { about: result, title: 'About' });
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * { about details }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const about_details = (req, res) => {
  const id = req.params.id;
  About.findById(id)
    .then(result => {
      res.render('about/editAbout', { about: result, title: 'About edit' });
    })
    .catch(err => {
      console.log(err);
      res.render('error/404', { title: 'About not found' });
    });
}

/**
 * { about update }
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
const about_update = (req, res) => {
  About.updateOne({}, { body: req.body.body })
    .then(result => {
      res.redirect('/about');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  about,
  about_details,
  about_update
}