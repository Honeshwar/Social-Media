//use MW to authenticate jwt token from user
const passport =  require('passport');
const jwtStrategy = require('passport-jwt').Strategy;//strategy an func that is json web token strategy
// console.log(require('passport-jwt'));
const jwtExtract = require('passport-jwt').ExtractJwt;//an obj inside it many func key-value pair m
//help to extract jwt (token) from header(client req)

const User = require('../models/users');
const env = require('./env');

//head part thing from user req(client)
let opts = {
    // /user web token
    jwtFromRequest : jwtExtract.fromAuthHeaderAsBearerToken(),//it extract token from header from authorization(key)  an value bearer token
    //it extract from header having a lot of key it find for a bearer as key = jwt token and extract it                   
    secretOrKey:env.jwt_secret  // like 123=abc, token = hi , use for decrypt(unlock)
};

//tell passport to use jwt strategy
passport.use(new jwtStrategy(opts,function(jwtPayload,done){//see at last, strategy use opts to decrypt jwt token get all data that token having it(strattegy) pass to callback

    User.findById(jwtPayload._id,function(err,user){

        if(user){
            return done(null,user);//may pass to req to user
        }else{
            return done(false,false);//null=false in boolean
        }
    })
}));


module.exports = passport;

// return res.status(200).json({
//     message:"sign in successfully ,here is your token please keep it safe",
//     data:{
//         token:jwtTOken.sign(user.toJSON(),"hi",{expiresIn:"10000"})// jwtpayload user as json obj
//         //(head(Payload),secretkey,expireTime)
//     }
// });