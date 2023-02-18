const mongoose=require('mongoose');

const uri=process.env.MONGODB_CONNECTION_STRING;
console.log(uri)

mongoose.set('strictQuery',true)
mongoose.connect(uri,{useUnifiedTopology:true})

const connection=mongoose.connection



module.exports=connection

