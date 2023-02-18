
const collection=require('../config/collection')
const productSchema=require('../schemas/product-schemas')


module.exports={
    addProduct:(product)=>{
            return new Promise(async (resolve,reject)=>{
                const { product_name: productName, description: productDetails, category: productCategory, price: productPrice, stock: stockQuantity } = product;

const newProduct=new productSchema( {
  productName,
  productDetails,
  productCategory,
  productPrice,
  stockQuantity
});

await productSchema.create(newProduct)
console.log(newProduct)

resolve();


            })
    }
}