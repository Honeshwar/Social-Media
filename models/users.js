const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //less important last(decreasing order) write
   email: {
            type:String,
            required:true,
            unique:true
    },
   password: {
            type:String,
            required:true,
           
       },
    name: {
            type:String,
            required:true,
           
    },
},{timestamps:true});


const User = mongoose.model('Users',userSchema);

module.exports = User;