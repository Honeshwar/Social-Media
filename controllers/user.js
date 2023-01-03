  const User = require("../models/user");
  
  //an action create of an router
  module.exports.profile = function(req,res){
  return res.render("user_profile",{
    title:"profile",
    layout:"layout"
  });
  }

  module.exports.email = function(req,res){
  return res.end("<h1>Email</h1>")
  }

  module.exports.signIn = function(req,res){
  return res.render('user_signIN',{title:'Sign In'});
  }


  module.exports.signUp = function(req,res){
  return res.render('user_signUp',{title:'Sign Up'});
  }

  // get the sign up data    
  module.exports.create = function(req,res){
  //todo after cookies
  // console.log(req.body)
  //check for password matches to confirm password
    if(req.body.password != req.body.confirm_password){
      return res.redirect('back');
    }  

  //using unique attribute (field) file already use exist in db or not
  User.findOne({email:req.body.email},function(error,user){
    if(error){console.log("error while finding user");return;}
      
      //if user not found
      if(!user){
        User.create(req.body,function(error,user){
        if(error){console.log("error while creating user");return;}
        
        return res.redirect("/user/signIn");

        });
      }else{
        return res.redirect('back');
      }
  });
  

}

  // create the sign in  session //  MANUAL AUTHENTICATION //
  module.exports.create_session = function(req,res){
  
  }
    
  