
const express = require('express');
const likeController = require('./../controller/likeController');

const router = express.Router();

router.post('/', likeController.blog_like_post);
module.exports = router;