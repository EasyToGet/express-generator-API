var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/', PostsControllers.getPosts);

router.post('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.patch('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
