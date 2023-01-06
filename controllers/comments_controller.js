const Posts = require('../models/posts');
const Comments= require('../models/comments');

// module.exports.create = function(req,res){
//     // / check for post_id that pass at form hiddenly are valid or not (may possible any user by inspect developer tools change post._id) so for that not create comment in db
    
//     Posts.findById(req.body.post_id,function(err,post){
//                   if(err){
//                     return console.log('err while finding post in Posts model or collection')
//                   }
//                   if(post){
//                     //create comment
 
//                     Comments.create({
//                         content:req.body.content,
//                         user:req.user._id,
//                         post:post._id//req.body.post_id
//                     },function(err,comment){
//                         if(err){
//                             return console.log('err while creating comment in comment model')
//                           }
//                           console.log(post,post.comments,comment
                            
//                             )
//                           post.comments.push(comment);//mogobd provide func that push entire single comment to this post comment fields  that each instance of schema(post) will have in Posts model
//                           post.save();// it will save the comment in posts ,because initially comment stor in RAM when push
//                      return res.redirect('/');
//                     })
//                   }
//     });
// }


module.exports.create = async function(req,res){
  
 try {
   // / check for post_id that pass at form hiddenly are valid or not (may possible any user by inspect developer tools change post._id) so for that not create comment in db
   const post = await Posts.findById(req.body.post_id);

   let comment = null;
   if(post){
     //create comment
       comment = await Comments.create({
          content:req.body.content,
          user:req.user._id,
          post:post._id//req.body.post_id
       })
       post.comments.push(comment);//mongobd provide func that push entire single comment to this post comment fields  that each instance of schema(post) will have in Posts model
       post.save();// it will save the comment in posts ,because initially comment stor in RAM when push
   }
   
   if(req.xhr){//that means it is an ajax req
    return res.status(200).json({
      data:{
        comment:comment
      },
      flashMessage:{
        success:" comment created"
      },message:"comment created successfully"
    })
   }
   req.flash('success',"Successfully created comments");// we create MW work,this req.flash set to locals
   return res.redirect('/');


 } catch (error) {
  // console.log(error,'create comment controller');
  req.flash('error',error);// we create MW work,this req.flash set to locals
  return res.redirect('back');

 }

}


// module.exports.destroy = function(req,res){
//   Comments.findById(req.params.id,function(err,comment){
    
//     // instead of find post query params use because  ejs level i have post,comment,user hai, fast action
//     Posts.findById(comment.post,function(err,post){
      
//       if(comment.user == req.user.id || req.user.id == post.user)
//       {
//       const postID=comment.post;
//        comment.remove();
//        Posts.findByIdAndUpdate(postID,
//         {$pull:{comments:req.params.id}},
//         function(err,post){
//           return res.redirect('back');
//         });

//       }else{
//          return res.redirect('back');
//       }
//     })
//   })
// }

//after async await + error handling

module.exports.destroy = async function(req,res){
 try {
      const comment = await Comments.findById(req.params.id);
      // instead of find post query params use because  ejs level i have post,comment,user hai, fast action
      const post = await Posts.findById(comment.post);

  if(comment.user == req.user.id || req.user.id == post.user)
      {
       const postID=comment.post;
       comment.remove();
       await Posts.findByIdAndUpdate(postID, {$pull:{comments:req.params.id}});
        
      }
      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id:req.params.id
          },
          flashMessage:{
            success:" comment deleted"
          },message:"successfully comment deleted"
        })
      }
      
      req.flash('success',"Successfully deleted  comments!");// we create MW work,this req.flash set to locals
      return res.redirect('back');

 } catch (error) {
      // console.log(error,'destroy comment controller');
      req.flash('error',error);// we create MW work,this req.flash set to locals
      return res.redirect('back');
 }
}