var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin');
});

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products')
})

module.exports = router;
