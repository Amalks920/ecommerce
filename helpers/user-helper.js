
collection=require('../config/collection')
userSchema=require('../schemas/user-schema')
const bcrypt=require('bcrypt');



module.exports={
    userSignUp:(user)=>{
        const salt=bcrypt.genSaltSync(12);
        const hash=bcrypt.hashSync(user.password,salt);
        
        return new Promise(async (resolve,reject)=>{
           const {username:username,email:email,password:password}=userSchema;

            const newUser= await new userSchema({
                username:user.username,
                email:user.email,
                password:user.password

            })
            
            newUser.password=hash;
            await newUser.save()
            

            resolve()

        })
    },
    userLogIn:(user)=>{
            userSchema.findOne({username:user.username},(err,result)=>{
                bcrypt.compare(user.password,userdb.password)
            })
    }
}
