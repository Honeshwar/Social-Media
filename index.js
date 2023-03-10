    const express = require('express');
    const app = express();
    const port = 8000;
    //environment variables(two variable production and development)
    const env = require('./config/env');

    //database 
    const db = require("./config/mongoose");
        
    // an parser to store req thing in body object 
    app.use(express.urlencoded());
    
    //cookie-parser import  and use it // pass MW
    const cookies = require('cookie-parser');
    app.use(cookies());
   
    // const nodeMailer = require('./config/nodeMailer');
    // used for session cookie
    //passport use for authentication and session use for set cookie session
    const passport = require('passport');//library
    const session = require('express-session');//encrypt provide by this library
    const passportLocal = require('./config/passport-local-strategy');// auth.code
    const passportJWT = require('./config/passport-jwt-strategy');
    const passportGoogle = require('./config/passport-google-oauth2-strategy.js');// it load the authentication code
    
    //set up connect mongo to store session in db(currently at restart server session expire(destroyed))
    const MongoStoreSession = require('connect-mongo');
    const MongoStore =  MongoStoreSession(session);
    const nodeSassMW = require('node-sass-middleware');
    //connect flash
    const flash = require('connect-flash');
    const Flash_MW = require('./config/flash-middleware');
   
    //setup the chat server to be used with socket.io
    const chatServer = require('http').Server(app);//means http server is express server,say http to not create new server just use express server code ,already server code written above we use it and listen in different port
    const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
    chatServer.listen(5000);//port set in  which chatServer get listen
    console.log("chat server is running on port 5000");


    const path = require('path');

    app.use(nodeSassMW({
        src:path.join(__dirname,env.assets_path,'/scss'),
        dest: path.join(__dirname,env.assets_path,'/css'),
        debug:'true',
        outputStyle:'extends',
        prefix:'/css'
    }));// create an in assess for different  router ( just temporary we will find optimal way  )

//    const sass = require('node-sass');
//     sass.render({
//       file: "./assets/scss/header.scss",
//       outputStyle: 'expanded',
//     outFile: '/assets/css/header.css',
//     sourceMap: true, // or an absolute or relative (to outFile) path
    
//     }, function(err, result) { if(err)console.log('err',err);/*...*/ console.log(result)});
    
    //layout
    const expressLayouts = require('express-ejs-layouts');
    app.use(express.static()); //relative path
    
   
    // app.use('./assets',express.static(path.join(__dirname, 'assets')));

    //make the uploads path available to the browser
    app.use('/uploads',express.static(__dirname + '/uploads'));//when need file from this directory/folder in ejs file to send browser so express app give that file to ejs and view engine sent to browser,tell express app to use static file here when need in html page(<img>)

    app.set("layout extractStyles",true);
    app.set("layout extractScripts",true);
    app.use(expressLayouts);//variable that having RequestHandler interface in it
    
    
    
 
    
    //setting up the view engine
    app.set('view engine','ejs')
    app.set('views','./views')
    
    //add MW for session
    app.use(session({
        name:"user_token",
        // TODO change the secret before deployment in production mode
        secret:env.session_secret,
        saveUninitialized:false,
        resave:false, 
        cookie:{// max cookie session time
            maxAge:(1000*60*100)//in ms
        },
        store: new MongoStore({
            mongooseConnection:db,
            autoRemove:'disabled'
           },function(err){
            console.log("************connect-mongo is connect and storing session cookie**********");
           })
        })
    
    );

    // add MW for Passport 
    app.use(passport.initialize()); 
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);

    //always use flash , tell to express to use flash in express app
    app.use(flash());
    // console.log(flash,"***********",flash()());
    app.use(Flash_MW.setFlash);
    // console.log(Flash_MW);

    //call middleware an layer 
    app.use('/',require('./routes'));
    
    app.listen(port,(err)=>{
        if(err){
            console.log(`Error while running express server ${err}`)
        return;
    }
    return console.log(`Server is running on port : ${port}`)
    });
    

    