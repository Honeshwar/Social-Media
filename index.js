const express = require('express');// console.log(express);//Function: createApplication]{ // application: { 
const app = express();//return an object tht having many functionality  all // console.log(app);
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets')); // above MW of expressLayouts so layout will having its static file access before rendering {logical order if not do also work fine but its logical order to understand usage}

// 
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

app.use(expressLayouts);//variable that having RequestHandler interface in it

// an parser to store req thing in body object 
app.use(express.urlencoded());

//call middleware an layer 
app.use('/',require('./routes'));


//setting up the view engine
app.set('view engine','ejs')
app.set('views','./views')



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


