const User = require('../../../models/users');
const jwtTOken = require('jsonwebtoken');
const env = require('../../../config/env');
module.exports.createSession = async function(req,res){
  
    try {
           //using unique attribute (field) file already use exist in db or not
       const user = await User.findOne({email:req.body.email});

      //check for password matches to confirm password
      if(!user || user.password != req.body.password){
       return res.status(422).json({
        message:"Invalid USername and password"//so hacker will never know that password is in correct
       });
        }else{
            return res.status(200).json({
                message:"sign in successfully ,here is your token please keep it safe",
                data:{
                    token:jwtTOken.sign(user.toJSON(),env.jwt_secret,{expiresIn:"1000000000"})// jwt payload user as json obj, we don't save token at db(mo need to active all time like ligin)
                    //(head(Payload),secretkey,expireTime)
                }
            });
        }
   
   
       return res.redirect("/user/signIn");
   
    } catch (error) {
        return res.json(500,{
            message:'Invalid Server Error'
           });
    }
   
   }
   

