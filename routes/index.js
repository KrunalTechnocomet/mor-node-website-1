var express = require('express');
var router = express.Router();
const { getStatesList } = require('../controllers/auth/getCounrtyList.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { layout: 'index' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { layout: 'index' });
});
router.get('/registers', async(req, res, next)=>{
  await getStatesList(res);
  res.render('registers', { layout: 'index' });
});
router.get('/diamondpurchase', function(req, res, next) {
  res.render('diamondpurchase', { layout: 'index' });
});
router.get('/termsconditions', function(req, res, next) {
  res.render('termsconditions', { layout: 'index' });
});
router.get('/selectdiamond', function(req, res, next) {
  res.render('selectdiamond', { layout: 'index' });
});
router.get('/privacypolicy', function(req, res, next) {
  res.render('privacypolicy', { layout: 'index' });
});
router.get('/faq', function(req, res, next) {
  res.render('faq', { layout: 'index' });
});
router.get('/congratulations', function(req, res, next) {
  res.render('congratulations', { layout: 'index' });
});
router.get('/about', function(req, res, next) {``
  res.render('about', { layout: 'index' });
});

module.exports = router;
