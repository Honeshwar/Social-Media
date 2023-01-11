//use as MW for authentication

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;//this library use because it contain both oauth and oauth2 Strategy
const crypto = require('crypto');//in build library in nodejs,no need to install(deprecated)
const User = require('../models/users');
const { Strategy } = require('passport-local');
 
 
//tell passport to use google oauth strategy
passport.use(new GoogleStrategy({
    // MATCH with google send data to browser
    clientID:"850782517174-40ebe3hmcpkcgb1d7komn7hfo67ho2r4.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback"
    },function(accessToken,refreshToken,profile,done){
        //find user
        User.findOne({email:profile.emails[0].value},function(err,user){
            if(err){console.log(err,"error in finding user by email that provide by google strategy");return;}

            console.log(profile);
            //if found,set this user as req.user
            if(user){
                console.log("set this user as req.user in google auth code ",user,profile.emails[0].value);
                return done(null,user);// directly passport do serialize user because passport get user,serialize fun set at local strategy call
                //user an array inside it obj = user,find() an array return user[0],find one an obj return
            }else{
                 //if not found, create user in collection/model and set it as req.user,pass to req
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')//a - f and 0 - 9
                },function(err,user){
                    if(err){console.log(err,"error in creating user that provide by google strategy");return;}

                    return done(null,user);
                });
            }
        });
}));



module.exports = passport;

// accessToken is an token like jwt that created by google pass with cb url
// ,refreshToken if token expire so with it help we said to google to generate again n token
// ,profile generally all data about user pass in profile,user having multiple email also pass
// ,done use as cb to end the function and say to passport to set user in req.user or pass user to req
//also say verify func that use after verifying use


// passport.use( new Strategy(obj,func))syntax for all strategy use(constructor)

//*****  important *******
// when manually file form of sign in than passport-local-strategy use as MW to Auth, router /user/create-session
// when using google auth than router /user/auth/google/ , /user/auth/google/callback
//at google time local strategy not get executed only func serialize... all execute when google strategy do done(null,user),req.user user pass at req passport call all fun that need user to execute.