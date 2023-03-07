const mongoose=require('mongoose');
const productSchema=require('./product-schemas')


console.log('product schemas=======')
console.log(productSchema)

const Schema=mongoose.Schema;

const userCartSchema=new Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users',
        require:true,
        unique:true
    },
    product:{
        type:Array,
        ref:'productSchema',
    }
})


const userCart=mongoose.model('Cart',userCartSchema)

module.exports=userCart;