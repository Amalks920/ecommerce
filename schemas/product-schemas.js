const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
    productName:{
        type:String,
        require:true,
        
    },
    productDescription:{
        type:String,
        require:true,
    },
   
    productCategory:{
        type:String,
        require:true,
        
    },
    productPrice:{
        type:Number,
        require:true,
       
    },
    stockQuantity:{
        type:Number,
        require:true,
       
    },
    productImage:{
        data:Buffer,
        contentType:String,
    }
})

const product=mongoose.model('product',productSchema)

module.exports=product;