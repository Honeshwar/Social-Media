 const express = require('express');// console.log(express);//Function: createApplication]{ // application: { 
const app = express();//return an object tht having many  functionality  all // console.log(app);
const port = 8000;

//database
const db = require("./config/mongoose");
//cookie-parser import  and use it // pass MW
const cookies = require('cookie-parser');
app.use(cookies());

// used for session cookie
//passport use for authentication and session use for set cookie session

/* Why did we use express-sessions ?
To create a session cookie 
To store the logged in user’s information in an encrypted format in the cookie  */
const passport = require('passport');//library
const session = require('express-session');//encrypt provide by this library
const passportLocal = require('./config/passport-local-strategy');// auth.code

//layout
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets')); // above MW of expressLayouts so layout will having its static file access before rendering {logical order if not do also work fine but its logical order to understand usage}
// layout extract style and script from ejs
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);
app.use(expressLayouts);//variable that having RequestHandler interface in it




// an parser to store req thing in body object 
app.use(express.urlencoded());


//setting up the view engine
app.set('view engine','ejs')
app.set('views','./views')

//add MW for session
app.use(session({
    name:"koke",//name of cookie session token(id) 
    // TODO change the secret before deployment in production mode
    secret:'koko',
    saveUninitialized:false,//when user not login(uninitialized), saving data in cookies set false(not save)
    resave:false, // re-saving or rewriting cookies set false,save same cookie again and agian set false
    cookie:{// max cookie session time
        maxAge:(1000*60*100)//in ms
    }

}));

// add MW for Passport
app.use(passport.initialize());// code that we write(at passport-local-strategy.js) could execute on client req come check 
app.use(passport.session());//encrypt provide to cookie here password session
// app.use(function(req,res,next){
//     console.log(req,'jiji')
// })
// app.use(passport.setAuthenticatedUser());


//call middleware an layer 
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error while running express server ${err}`)
    return;
}
return console.log(`Server is running on port : ${port}`)
})

// to try what is main file
// module.exports.a=function()
// {const express = require('express');// console.log(express);//Function: createApplication]{ // application: { 
// const app = express();//return an object tht having many functionality  all // console.log(app);
// const port = 8000;



// // an parser to store req thing in body object 
// app.use(express.urlencoded());

// //call middleware an layer 
// app.use('/',require('./routes'));


// //setting up the view engine
// app.set('view engine','ejs')
// app.set('views','./views')



// app.listen(port,(err)=>{
//     if(err){
//         console.log(`Error while running express server ${err}`)
//     return;
// }
// return console.log(`Server is running on port : ${port}`)
// })

// }


