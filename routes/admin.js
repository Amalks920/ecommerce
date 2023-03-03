var express = require('express');
var router = express.Router();
const productHelper=require('../helpers/product-helper')
const path=require('path')
//const upload=require('../app');



/* GET users listing. */
router.get('/', async function(req, res, next) {
const products= await  productHelper.getProduct()
  console.log(products)
  res.render('admin/admin',{admin:true,products});
});

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products',{admin:true});
})



router.post('/add-products',(req,res)=>{
  //console.log(req.body)

  console.log('hello it the image')
  //console.log(req.files.image)
  
  productHelper.addProduct(req.body).then((id)=>{
    const files=req.files.image;
  files.mv('./public/product-images/'+id+'.jpg')
    console.log('product added')
    
  })
 
})


module.exports = router;
