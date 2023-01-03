const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/CODE_SOCIAL_DEVELOPMENT");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"getting error in database e=while connecting"));

db.once('open',function(){
    console.log("database is running fine.........");
});

module.exports = db;// so use to use db at express server
//when server run i want database also run so to initialize it i import connection in main js file