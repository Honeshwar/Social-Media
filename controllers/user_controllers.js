  const Users = require("../models/users");
  const  path = require('path');
  // const cookieParser = require("cookie-parser");
  //an action create of an router

  // module.exports.profile = function(req,res){
  //   //with using cookie-parser
  //   // if(req.cookies.user_id){
  //   //   //callback are asynchronous so if we use return after if than an error come
  //   // User.findById(req.cookies.user_id,function(error,user){// is obj like in db
  //   //   if(error){console.log("error while finding user");return;}
      
  //   //   if(user){
  //   //   return res.render("user_profile",{
  //   //     title:"profile",
  //   //     layout:"layout",
  //   //     user:user
  //   //   });
  //   // }else{
  //   //   // if cookies change at developer tool se,so user_id invalid(no in db) for db
  //   //   return res.redirect('/user/signIn');
  //   // }

  //   // });

  //   // }else{
  //   //   return res.redirect('/user/signIn');
  //   // }
  //   return res.render("user_profile",{title:"Profile"});
  // }


  //get reqs
  
  module.exports.profile = function(req,res){
    Users.findById(req.params.id,function(err,user){

      return res.render("user_profile",{
        title:"Profile",
        profile_user:user
      });
    })
  }

  //update
  // module.exports.update = function(req,res){
  //   //user valid or not(every user access of developer tool,so he can change id as input in html tags)
  //   if(req.user.id == req.params.id){
  //     Users.findByIdAndUpdate(req.params.id,req.body,function(error,user){
  //       if(error){
  //         req.flash('error',error);// we create MW work,this req.flash set to locals
        
  //       }
  //       return res.redirect('back')
  //     })
  //   }else{
  //     // return res.status(401).send('Unauthorized');
  //     req.flash('error',"401 Unauthorized");// we create MW work,this req.flash set to locals
  //     return res.redirect('back')
  //   }
  // }
  
  module.exports.update = async function(req,res){
    
    
      //user valid or not(every user access of developer tool,so he can change id as input in html tags)
      if(req.user.id == req.params.id){
        try {
          let user = await Users.findById(req.params.id);
          //use uploaded avatar because multipart/form-data as req,req pass here
          // an mw multer provide
          // Users.static.uploadedAvatar
          Users.uploadedAvatar(req,res,function(error){
            if(error){console.log("multer error",error);}

            console.log(req.file);
            user.email = req.body.email;//ram upper store
            user.name = req.body.name;

            if(req.file){
              user.avatarFilePath = Users.avatar_path + '/' + req.file.filename;//field fill path
           //                 /uploads/users/avatar        /filename

           //problem user as many time upload file multer save in disk storage,we need only store that img that user want his profile and delete previous
          //  if(user.avatar){
          //   fs
          //  }

            }

            user.save();//it will save all save data from ram to db
            return res.redirect('back')
          });

        } catch (error) {
          console.log(error);
          req.flash('error',"error while updating");// we create MW work,this req.flash set to locals
          return res.redirect('back')
        }

      }else{
    
      req.flash('error',"401 Unauthorized");// we create MW work,this req.flash set to locals
      return res.redirect('back')
    }
  }
  
  module.exports.email = function(req,res){
  return res.end("<h1>Email</h1>")
  }

  module.exports.signIn = function(req,res){
    // if user login  ==true return to profile
    if(req.isAuthenticated()){
      // return res.redirect('/user/profile');
      return res.redirect('/');
    }
  return res.render('user_signIn',{title:'Sign In'});
  }


  module.exports.signUp = function(req,res){
    // if user login  ==true return to profile
    if(req.isAuthenticated()){
      // return res.redirect('/user/profile');
      return res.redirect('/');
    }
  return res.render('user_signUp',{title:'Sign Up'});
  }

  // get the sign up data    
//   module.exports.create = function(req,res){
//   //todo after cookies
//   // console.log(req.body)
//   //check for password matches to confirm password
//     if(req.body.password != req.body.confirm_password){
//       return res.redirect('back');
//     }  

//   //using unique attribute (field) file already use exist in db or not
//   Users.findOne({email:req.body.email},function(error,user){
//     if(error){console.log("error while finding user");return;}
      
//       //if user not found
//       if(!user){
//         Users.create(req.body,function(error,user){
//         if(error){console.log("error while creating user");return;}
        
//         return res.redirect("/user/signIn");

//         });
//       }else{
//         // return res.redirect('back');
//         return res.redirect("/user/signIn");
//       }
//   });
  

// }

// ******** after async await

module.exports.create =async function(req,res){
  
 try {
   //check for password matches to confirm password
   if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
     }  

    //using unique attribute (field) file already use exist in db or not
    const user = await Users.findOne({email:req.body.email});

    //if user not found
    if(!user){
     await Users.create(req.body);
    }

    return res.redirect("/user/signIn");

 } catch (error) {
  // console.log("while create user in user controller",error);
  req.flash('error',error);// we create MW work,this req.flash set to locals
  return res.redirect("/user/signUp");
 }

}

  // create the sign in  session //  MANUAL AUTHENTICATION //

  module.exports.create_session = function(req,res){
    req.flash('success','Successfully Sign In');
      return res.redirect('/');
      }


  // module.exports.create_session = function(req,res){
  // // find user in db
  // // User.findOne({email:req.body.email},function(error,user){

  // //   if(error){console.log("error while finding user");return;}
      
  // //   //user not found
  // //   if(!user){
  // //     return res.redirect("back");
  // //   }else{
  // //     // user found
  // //     //check password match
  // //    if(user.password != req.body.password){
  // //     return res.redirect('back');
  // //    }


  // //     //create session for signIn
  // //      res.cookie("user_id",user._id);
  //     //  return res.redirect("/user/profile");//complete router (url)
  //     return res.redirect('/');
  //   }

  // });
  // }
    
  
  //sign out

  module.exports.destroySession = function(req,res){
    
    // res.clearCookie("user_id");
    // return res.redirect("/user/profile");

    //passport provide an func. to destroy coolie
    // await
   req.logout(function(err) {
      if (err) {  console.log(err)
    }});
    req.flash('success',"Successfully Sign Out");
    return res.redirect("/user/signIn");
  }