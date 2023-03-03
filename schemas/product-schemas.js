const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
    productName:{
        type:String,
        require:true,
        lowercase:true,
        
    },
    productDescription:{
        type:String,
        require:true,
        lowercase:true,
    },
   
    productCategory:{
        type:String,
        require:true,
        lowercase:true,
        
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

const product=mongoose.model('Product',productSchema)

module.exports=product;