const About = require('../model/about');

const about = (req, res) => {
  About.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('about', { about: result, title: 'About' });
    })
    .catch(err => {
      console.log(err);
    });
}

const about_details = (req, res) => {
  const id = req.params.id;
  About.findById(id)
    .then(result => {
      res.render('editAbout', { about: result, title: 'About edit' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'About not found' });
    });
}

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