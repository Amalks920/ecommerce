
const collection=require('../config/collection')
let productSchema=require('../schemas/product-schemas')
const userCartSchema=require('../schemas/cart-schema')
const { db } = require('../schemas/user-schema')

productSchema=productSchema;


module.exports={
    addProduct:(product)=>{
            return new Promise(async (resolve,reject)=>{
                const { product_name: productName,description:productDescription, category: productCategory, price: productPrice, stock: stockQuantity,image:productImage } = product;

const newProduct=new productSchema( {
  productName,
  productDescription,
  productCategory,
  productPrice,
  stockQuantity,
  productImage
});


await productSchema.create(newProduct)
console.log(newProduct._id)

resolve(newProduct._id);


            })
    },

    getProduct:()=>{
      return new Promise((resolve,reject)=>{
       const products= productSchema.find({})
        //console.log(products)
        console.log('axios worked')
       resolve(products)
      })
    },
   
}