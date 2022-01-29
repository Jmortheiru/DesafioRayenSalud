var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Inicia Session' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Inicia Session' });
});

module.exports = router;
