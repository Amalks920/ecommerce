var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helper')
const bcrypt=require('bcrypt');

//verify login middleware.we can use it in every route where login verification required



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
