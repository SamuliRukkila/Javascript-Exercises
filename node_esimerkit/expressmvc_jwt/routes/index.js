var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express JWT' });
});

router.get('/lista', function(req, res, next) {
  res.render('list', { title: 'Express' });
});

module.exports = router;
