var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helper')
const bcrypt=require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.LoggedIn){
    res.render('users/users',{user:true,LoggedIn:true})
  }
  res.render('users/users',{user:true});
  
});

router.get('/cart',(req,res)=>{
  res.render('users/user-cart',{user:true})
})

/*user login*/
router.post('/user-signup', async(req,res)=>{
  
   await userHelper.userSignUp(req.body)
   req.session.LoggedIn=true;
   res.redirect('/')
 
 
})

router.post('/user-login', async(req,res)=>{
      await userHelper.userLogIn(req.body)
        if(req.session.LoggedIn){
          
        }
      
})


module.exports = router;
