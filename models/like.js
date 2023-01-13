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
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        enum:['Posts','Comments']// not use this that all model  dynamic refer//but chose among two
    }
},{timestamps:true});//create at and update at date/time 

const Likes = mongoose.model('Likes',likeSchema);

module.exports = Likes;

//i have to store two thing first like object id(byn) and second type(posts,comments) of liked object,on which like happen