//same instance fetch that first req any file it done by nodejs automatically internally
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'// collection name,that given in user.js while creating model
    },
    //include the array of ids of all comments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'//post comments field refer(relate) to Comments Model
    }

    ],
    // at same time when display post we have to display likes o post also//so for faster retrieval we use array here//we can do directly retrieve from db but that make our site little slow
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Likes'
        }
    ]
},{timestamps:true})// create and update date and time tell us in db stored


//collection create //model
const Post = mongoose.model('Posts', postSchema);

module.exports = Post; // using express fun. different operation take place