//import Post collection/model to create any document inside it
const Posts = require('../models/posts');
const Comments = require('../models/comments');

module.exports.create = function(req,res){

// console.log(req);
    Posts.create({
        content:req.body.content,
        user: req.user.id  // when setAuthenticationUser happen   where passport create an key of user in req ,so req.user is an user data entire
        },  function(err,postData){
            if(err){
                // console.log(err,'err');
                // return;
                req.flash('error',error);// we create MW work,this req.flash set to locals
                return res.redirect('back');

            } 
        
    });
    
    //  req.post_array = POST_ARRAY;
    
    req.flash('success',"Successfully created post");// we create MW work,this req.flash set to locals
    return res.redirect('back');

}


//create  delete post action 
// module.exports.destroy = function (req,res){
//     //first check for post is in db posts model/collection or not 
//     Posts.findById(req.params.id,function(err,post){

//         if(err){return console.log('err in finding post while deleting')}
//         //2nd check ,is requested user is = that user who create post
//         if(req.user.id == post.user){//user only store id(f.k)
//             post.remove();
//             Comments.deleteMany({post:post.id},function(err){
//                 if(err){return console.log('err in finding post in comment model while deleting')}
//                 return res.redirect('back');
//             })
//         }else{//if hacker developer tool ma change kuch to get delete button so this never hack can bypass 
//             return res.redirect('back');
//         }
//     }) 
// }


module.exports.destroy = async function (req,res){
   
    
 try {
    const post = await Posts.findById(req.params.id);
    if(req.user.id == post.user){//user only store id(f.k)

        post.remove();
        await  Comments.deleteMany({post:post.id});
        req.flash('success',"Successfully deleted post and comments associated with it!");// we create MW work,this req.flash set to locals
        return res.redirect('back');
    
     }
 } catch (error) {
    // console.log(error,'while destroying post in post controller');
    req.flash('error',error);// we create MW work,this req.flash set to locals
    return res.redirect('back');
 }
}