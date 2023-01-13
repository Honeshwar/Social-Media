//import three thing like , post , comment model because create like , push in post ,comment array
const Likes = require('../models/likes');
const Posts = require('../models/posts');
const Comments = require('../models/comments');

module.exports.toggleLike = async function(req,res){//use async,await for good clean and understandable code and avoid call back hell

    try {
        // url likes/toggle/?id=dnjsk&type=post/comment
        // id= obj id of that liked object(post/comment) , type = string = comment/post
        let likeable;
        let deleted = false;//delete,//toggle,means pass in ajax req response , if true like count -1 if false count +1
    // "delete" an keyword to delete an obj,not use name as variable already taken

    if(req.query.type == 'post'){
        //like on post
        //find likes on this post whether user already liked or not
        likeable = await Posts.findById(req.query.id).populate('likes');// variable store entire post data


    }else{
        //like on comment
         //find likes on this comment 
        likeable = await Comments.findById(req.query.id).populate('likes');// variable store entire comment data


    }

    //check if like already exist or not
    let existingLike = await Likes.findOne({
        user:req.user._id,//auth time pass to req by passport
        likeable:req.query.id,//id of post/comment
        onModel:req.query.type
         
    });


    if(existingLike)//it will undefined=false, or an like obj = true
    {//user already liked, remove like because it click again
        //remove from post or comment and likes model/collection
        likeable.likes.pull(existingLike._id);//remove at ram (DS= array)
        likeable.save();//save at db
        existingLike.remove();

        deleted=true;//
    }else{
        //not exist than create new like document and also push to post/comment  array
        let like = await Likes.create({
            user:req.user._id,//auth time pass to req by passport
            likeable:req.query.id,//id of post/comment
            onModel:req.query.type
        });
        likeable.likes.push(like);
        likeable.save();
    }

    //sen ajax response
    if(req.xhr){
        return res.status(200).json({
            message:"request successfully",
            data:{
                deleted:deleted
            }
        })
    }
    








    } catch (error) {
        return res.json(500,{
            message:"Internal Server Error"
        });
    }

}