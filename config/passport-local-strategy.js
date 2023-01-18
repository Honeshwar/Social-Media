//import passport and passport local strategy
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication using password(sign-in)
//tell the passport to use strategy
passport.use(new LocalStrategy(
    {
        usernameField:'email',//unique in sign in(email)//at the time of sign in no cookies there with any key if of ession as id
        passReqToCallback:true
    },
    function(req,email,password,done)//done callback function
    {
        //find user  in db and than match password from db
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                // console.log("error in passport will find user");
                return done(err);}

            if(!user || user.password != password){
                req.flash('error','Invalid username/password')
                // console.log("Invalid username/password");
                return done(null,false);
            }

            return done(null,user);//pass user to req, set user to req.user(passport do)
            //may go passport k pass,it pass to serializer user callback fun .arg
        }); 
    }
));


// 2. serialize//find out which property sent to cookie
// pass value / property that have to set to cookie

//create session cookie
// strategy of google use by passport and when at google strategy done(null,user)  req.user and passport do serialize user when it get use
passport.serializeUser(function(user,done){
    // console.log("user  at serializer",user);
   return  done(null,user.id);// value for cookie in done arg.
    //  return done
});

// 3. deserializing
//already session time given and check for that session id is valid or not
// next req. come in check who sign in and make the req and feed page//like profile flaw to overcome , previous without passport.js

//remove session cookie,logout
passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
             
        if(err){
            req.flash('error',err);
            // console.log("error in passport will find user");
            return done(err);
        }

        return done(null,user);
    })
})



// create two MW function  for check and set

//check if user is authenticated or not
passport.checkAuthentication = function(req,res,next){
// if the user id sign in than pass on the req to the next func. (controller action --> we will use this fun. in router and between router url and controller)
    if( req?.isAuthenticated()){
       return next();
    }//? check if undefined req ==>false

// // if user is not sign in
    return res.redirect('/user/signIn');
    

}

// // ser auth.user to views locals
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req && req.isAuthenticated()){
        res.locals.user = req.user;
        // res.locals.user.title ="Profile";
    }
    return next();
}



module.exports = passport;


//1. sign in authentication do and than pass value that have to set to cookie (serializeUser) and  check for which user req by checking session token in cookie (deserializeUser)


