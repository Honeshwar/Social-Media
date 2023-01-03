const mongoose = require('mongoose');

//structure
const commentSchema = mongoose.Schema({

    content:{
        type:String,
        required:true
    },//comment belong to user and post
    user:{
        type:mongoose.Schema.Types.ObjectId,// instance of schema create , that id
        ref:"Users"//model name(collection name)
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,// instance of schema create , that id
        ref:"Posts"//model name(collection name)
    }
},{
    timestamps:true //mongodb create apne end se, create at and update at data and time // separate pass this things from above,we dont fill it as data

  }
);

module.exports = mongoose.model('Comments', commentSchema );