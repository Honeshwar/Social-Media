const express = require('express');// console.log(express);//Function: createApplication]{ // application: { 
const app = express();//return an object tht having many functionality  all // console.log(app);
const port = 8000;



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