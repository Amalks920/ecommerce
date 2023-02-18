
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
             return new Promise(async (resolve,reject)=>{
              const userDb=  await userSchema.findOne({username:user.username})
              if(userDb.username===user.username){
                const verifyPassword=await bcrypt.compare(user.password,userDb.password)
                if(verifyPassword){
                    resolve(true)
                }else{
                    resolve(false)
                }
              }
              
            })
    }
}
