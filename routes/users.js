var express = require('express');
var router = express.Router();
const userHelper=require('../helpers/user-helper')
const bcrypt=require('bcrypt');
const productHelper = require('../helpers/product-helper');


//verify login middleware.we can use it in every route where login verification required



/* GET home page. */
router.get('/', async function(req, res, next) {
 // console.log('req.session.loggedin')
  //console.log(req.session.loggedIn)
  const loggedIn=req.session.loggedIn;
  if(loggedIn){
  productHelper.getProduct().then((products)=>{
    //console.log('hi its true')
    //  console.log(products)
    res.render('users/users',{user:true,loggedIn,products})
  })
  
  }else{
    console.log('hi loggedIn is untrue')
  res.render('users/users',{user:true});
  }
  
});

/*cart related routes*/
router.get('/cart',async (req,res)=>{
 const cartProducts= await userHelper.displayCart(req.session.user._id)
 console.log("cart_product-------------.....>>>>")
 
 console.log(cartProducts[0].product)

 //console.log(cartProducts.prodId[0]._id)
  res.render('users/user-cart',{user:true,cartProducts})
})

router.get('/add-to-cart/:id',async (req,res)=>{

 const cart=await  userHelper.addToCart(req.params.id,req.session.user._id)
 console.log(cart)
 res.redirect('/')
})


/*cart related routes end here*/

/*user login*/
router.post('/user-signup', (req,res)=>{
  
    userHelper.userSignUp(req.body).then((user)=>{
      req.session.loggedIn=true;
   req.session.user=user
   //console.log(req.session.user)
   res.redirect('/')

    })
   
 
 
})

router.post('/user-login', async(req,res)=>{
       await userHelper.userLogIn(req.body).then(async (result)=>{
        if(result){
          req.session.loggedIn=true;
         
          console.log('hello')
         await userHelper.fetchUser(req.body.username).then((user)=>{
          req.session.user=user;
          
         
         
         })
          
          res.redirect('/')
        }else{
          req.session.loggedIn=false;
          res.redirect('/')
        }
          
       })
        
      
})



/* LOGOUT */

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})




router.post('/logout',(req,res)=>{
  console.log(req.body)
})


module.exports = router;
