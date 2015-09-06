var express = require('express');
var updatewu = require('../updatewu.js');
var updater = updatewu();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Thingsee - Weather Underground bridge' });
});

router.post('/', function(req, res, next) {
  updater.update(req.body);
  res.send('Ok');

});

module.exports = router;
