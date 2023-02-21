var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helper')
const bcrypt=require('bcrypt');
const productHelper = require('../helpers/product-helper');


//verify login middleware.we can use it in every route where login verification required



/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log('req.session.loggedin')
  //console.log(req.session.loggedIn)
  const loggedIn=req.session.loggedIn;
  if(loggedIn){
  productHelper.getProduct().then((products)=>{
    console.log('hi its true')
    console.log(products)
    res.render('users/users',{user:true,loggedIn,products})
  })
  
  }else{
    console.log('hi loggedIn is untrue')
  res.render('users/users',{user:true});
  }
  
});

/*cart related routes*/
router.get('/cart',(req,res)=>{
  res.render('users/user-cart',{user:true})
})
/*cart related routes end here*/

/*user login*/
router.post('/user-signup', async(req,res)=>{
  
   await userHelper.userSignUp(req.body)
   req.session.LoggedIn=true;
   res.redirect('/')
 
 
})

router.post('/user-login', async(req,res)=>{
       userHelper.userLogIn(req.body).then((result)=>{
        if(result){
          req.session.loggedIn=true;
          
          res.redirect('/')
        }else{
          req.session.loggedIn=false;
          res.redirect('/')
        }
          
       })
        
      
})


module.exports = router;
