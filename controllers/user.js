  const User = require("../models/user");
  const cookieParser = require("cookie-parser");
  //an action create of an router
  module.exports.profile = function(req,res){
    if(req.cookies.user_id){
      //callback are asynchronous so if we use return after if than an error come
    User.findById(req.cookies.user_id,function(error,user){// is obj like in db
      if(error){console.log("error while finding user");return;}
      
      if(user){
      return res.render("user_profile",{
        title:"profile",
        layout:"layout",
        user:user
      });
    }else{
      // if cookies change at developer tool se,so user_id invalid(no in db) for db
      return res.redirect('/user/signIn');
    }

    });

    }else{
      return res.redirect('/user/signIn');
    }
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
        // return res.redirect('back');
        return res.redirect("/user/signIn");
      }
  });
  

}

  // create the sign in  session //  MANUAL AUTHENTICATION //
  module.exports.create_session = function(req,res){
  // find user in db
  User.findOne({email:req.body.email},function(error,user){

    if(error){console.log("error while finding user");return;}
      
    //user not found
    if(!user){
      return res.redirect("back");
    }else{
      // user found
      //check password match
     if(user.password != req.body.password){
      return res.redirect('back');
     }


      //create session for signIn
       res.cookie("user_id",user._id);
       return res.redirect("/user/profile");//complete router (url)
    
    }

  });
  }
    
  
  //sign out

  module.exports.signOut = function(req,res){
  res.clearCookie("user_id");

    return res.redirect("/user/profile");
  }