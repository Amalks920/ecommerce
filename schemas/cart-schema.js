const mongoose=require('mongoose');

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
        ref:'Product',
        require:true,
       
    }
})

const userCart=mongoose.model('Cart',userCartSchema)

module.exports=userCart;