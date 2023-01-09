const Post = require('../../../models/posts');
const Comments = require('../../../models/comments');

module.exports.index = async function(req,res){
   
    try {

        //populate(field in post schema)
       const posts = await Post.find({}).sort('-createdAt')//array func to sort 
       .populate("user")
       .populate({
           path:'comments',//field
           populate:{ //nested populate
               path:'user' //inside array an comment obj field(content,""user"",post)
           }
        });
        
        return res.status(200).json({  // res/json(status,obj) are deprecated instead of this use that we use
            messages:"list of items of all users",
            posts:posts//collection/array
        });
    
    } catch (error) {
        
        return res.json({
            message:'error while find post and comments'
        });

    }
   

}

module.exports.destroy = async function (req,res){
   
    
    try {
       const post = await Post.findById(req.params.id);
    //    if(req.user.id == post.user){//user only store id(f.k)
   
           post.remove();
           await  Comments.deleteMany({post:post.id});
           return res.json({
            message:'Successfully deleted post'
           })
        
    } catch (error) {
    
       return res.json({
        message:'error while deleting post'
       });
    }
   }