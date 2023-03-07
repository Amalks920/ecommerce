
collection=require('../config/collection')
userSchema=require('../schemas/user-schema')
productSchema=require('../schemas/product-schemas')
userCartSchema=require('../schemas/cart-schema')
const bcrypt=require('bcrypt');
const connection=require('../config/connection')
const mongoose=require('mongoose');
//const product = require('../schemas/product-schemas');

console.log(productSchema)
console.log('productschema')


module.exports={
    userSignUp:(user)=>{
        const salt=bcrypt.genSaltSync(12);
        const hash=bcrypt.hashSync(user.password,salt);
        
        return new Promise(async (resolve,reject)=>{
           const {username:username,email:email,password:password}=userSchema;

            const newUser= await new userSchema({
                username:user.username,
                email:user.email,
                password:user.password

            })
            
            newUser.password=hash;
            await newUser.save()
            
             userSchema.findOne({username:user.username}).then((user)=>{
               // console.log('new user here')
                //console.log(user)
                resolve(user)
             })
           

        })
    },
    userLogIn:(user)=>{
             return new Promise(async (resolve,reject)=>{
              const userDb=  await userSchema.findOne({username:user.username})
              if(userDb.username===user.username){
                const verifyPassword=await bcrypt.compare(user.password,userDb.password)
                if(verifyPassword){
                    resolve(true)
                }else{
                    resolve(false)
                }
              }
              
            })
    },

    fetchUser:(userName)=>{

        return new Promise(async (resolve,reject)=>{
            const user=await userSchema.findOne({userame:userName})
            
            resolve(user)
        })

    },

    /*add to cart */
    addToCart:(prodId,userId)=>{
     const prodIdObj=mongoose.Types.ObjectId(prodId)
     console.log('prodIdObj')
      console.log(prodIdObj)
      let proObj={
        item:prodIdObj,
        quantity:1
      }

        
        return new Promise(async(resolve,reject)=>{
           
          const cart=await userCartSchema.find({user:userId})
          console.log(cart)
          console.log("this")
          

          if(cart.length!=0){
            console.log('hello i am here')

            //check if the product is already existing or not
            const proExist=await userCartSchema.findOne({product:{$elemMatch:{'item':prodIdObj}}})
            console.log(proExist)
            console.log('product checked')


            //if proExist we have to increment the quantity
            if(proExist){
                  await userCartSchema.updateOne({"user":userId,"product.item":prodIdObj},{$inc:{"product.$.quantity":1}})
                  console.log('proExist',proExist)
                  resolve()
                 
            }else{
               //if it is not the same product we have to add another object in product array.
               const cart=await userCartSchema.updateOne({user:userId},{$push:{product:proObj}})
              console.log('cart=========')
                resolve(cart)
            }

            
          }else{
            let userCart={
              cartUser:userId,
              cartProduct:[{item:prodIdObj,quantity:1}]
              
            }

           
            //console.log(userCart)

           const newCart=new userCartSchema({
                user:userCart.cartUser,
                product:userCart.cartProduct
            })
            console.log(newCart);
           await newCart.save()

           resolve(newCart) 
          
          }
          
        })
    },


    displayCart:(userId)=>{
      console.log('userId')
      console.log(mongoose.Types.ObjectId(userId))

      return new Promise(async (resolve,reject)=>{
        const cartProducts=await userCartSchema.aggregate([
          
            {
              '$match':{
                'user':mongoose.Types.ObjectId(userId)
            }
            },{
              '$unwind':{
                'path':'$product',
                'includeArrayIndex':'string',
                'preserveNullAndEmptyArrays':false
              }
            },{
              '$lookup':{
                'from':'products',
                'localField':'product.item',
                'foreignField':'_id',
                'as':'product.item'
              }
            },{
              '$addFields':{
                'product.item':{
                  '$arrayElemAt':[
                    '$product.item',
                    0
                  ]
                }
              }
            },   {
              '$group':{
                '_id':'$_id',
                'product':{
                  '$push':{
                     'quantity':'$product.quantity',
                     'item':'$product.item'
                  }
                }
              }
            }   


   /*        {
              '$unwind': {
                'path': '$product', 
                'includeArrayIndex': 'string', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$project': {
                'quantity': '$product.quantity', 
                'product': '$product'
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'product': {
                  '$push': {
                    'product': '$product'
                  }
                }
              }
            },
           */
          
        ])    
        resolve(cartProducts)
        console.log('cart') 
       // console.log(cartProducts[0].product[0].product.item)
      console.log(cartProducts[0].product[0])
      })
      
      
    }
    
    
}
