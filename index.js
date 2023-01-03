const express = require('express');
const app = express();

const port = 8000;
//call middleware an layer 
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error while running express server ${err}`)
    return;
}
return console.log(`Server is running on port : ${port}`)
})