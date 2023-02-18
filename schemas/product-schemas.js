const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
    productName:{
        type:String,
        require:true,
        unique:true
    },
    productDetails:{
        type:String,
        require:true,
        unique:true
    },
    productCategory:{
        type:String,
        require:true,
        unique:true
    },
    productPrice:{
        type:Number,
        require:true,
        unique:true
    },
    stockQuantity:{
        type:Number,
        require:true,
        unique:true
    }
})

const product=mongoose.model('product',productSchema)

module.exports=product;