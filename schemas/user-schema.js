const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
SALT_WORK_FACTOR=10;

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    
})

const user=mongoose.model('Users', userSchema)

module.exports=user;





