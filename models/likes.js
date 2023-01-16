const { methodOf } = require('lodash');
const mongoose = require('mongoose');//odm help communicate to mongodb

const likeSchema  = new mongoose.Schema({

    //we must have to know, which user did this like
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    //this defines the object id of liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'//refPath say another field tell about reference, tell in which type(posts,comments) like is been happen
        //dynamic reference ,it refer to another field that dynamically refer to two model (posts,comments)
    },
    onModel:{
        type:String,// store type = post/comment
        required:true,
        enum:['post','comment']// not use this that all model  dynamic refer//but chose among two
    }
},{timestamps:true});//create at and update at date/time 

const Likes = mongoose.model('Likes',likeSchema);

module.exports = Likes;

// url likes/toggle/?id=dnjsk&type=post/comment
//i have to store two thing first like object id(posts/comments,req pass) and second type(posts,comments) of liked object,on which like happen
//dynamic reference means that we are setting reference in any "other(different) field" (from bunch of references choose) and we use it in our field