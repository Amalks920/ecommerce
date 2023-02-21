
const collection=require('../config/collection')
const productSchema=require('../schemas/product-schemas')


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
       const products= productSchema.find()
        //console.log(products)
       resolve(products)
      })
    }
}