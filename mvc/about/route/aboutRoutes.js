const express = require('express');
const aboutController = require('./../controller/aboutController');

const router = express.Router();

router.get('/', aboutController.about);
router.get('/:id', aboutController.about_details);
router.post('/updateAbout', aboutController.about_update);

module.exports = router;