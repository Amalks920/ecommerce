var express = require('express');
var router = express.Router();
const productHelper=require('../helpers/product-helper')

  

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/admin',{admin:true});
});

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true});
})



router.post('/add-products',(req,res)=>{

  productHelper.addProduct(req.body).then(()=>{
    console.log('product added')
  })
 
})


module.exports = router;
