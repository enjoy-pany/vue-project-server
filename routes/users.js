var express = require('express');
var router = express.Router();
var userContr = require('../contr/userContr');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/queryAll', function(req, res, next) {
	userContr.queryAll(req, res, next);
});
router.post('/updateUser', function(req, res, next) {
	userContr.update(req, res, next);
});
router.get('/queryByUser', function(req, res, next) {
	userContr.queryByUser(req, res, next);
});
router.get('/queryByTeacher', function(req, res, next) {
	userContr.queryByTeacher(req, res, next);
});
router.post('/userInfo', function(req, res, next) {
    userContr.add(req, res, next);
});
module.exports = router;
