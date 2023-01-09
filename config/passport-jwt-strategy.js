const passport =  require('passport');
const jwtStrategy = require('passport-jwt').Strategy;//strategy an func that is json web token
// console.log(require('passport-jwt'));
const jwtExtract = require('passport-jwt').ExtractJwt;//help to extract jwt (token) from header(client req)

const User = require('../models/users');
//head part thing

let opts = {
    // /user web token
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),//it extract from header having a lot of key it find for a bearer as key = jwt token and extract it                   
    secretOrKey: 'hi' // like 123=jdkslaf, token = hi encrypt
};

//tell passport to use jwt strategy
passport.use(new jwtStrategy(opts,function(jwtPayload,done){

    User.findById(jwtPayload._id,function(err,user){

        if(user){
            return done(null,user);//may pass to req to user
        }else{
            return done(false,false);//null=false in boolean
        }
    })
}));


module.exports = passport;