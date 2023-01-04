//import Post collection/model to create any document inside it
const Posts = require('../models/posts');
const Comments = require('../models/comments');

// module.exports.create = function(req,res){

// // console.log(req);
//     Posts.create({
//         content:req.body.content,
//         user: req.user.id  // when setAuthenticationUser happen   where passport create an key of user in req ,so req.user is an user data entire
//         },  function(err,post){//created post fetch and retrieve here
//             if(err){
//                 // console.log(err,'err');
//                 // return;
//                 req.flash('error',err);// we create MW work,this req.flash set to locals
//                 return res.redirect('back');

//             } 
//             Posts.findById(post._id).populate('user').exec(
//                 function(err,postData){
//                     if(req.xhr){// ajax do xmlHttpReq
//                         req.flash('success',"Successfully created post");// we create MW work,this req.flash set to locals
//                         return res.status(200).json({//data go to ajax as res
//                             data:{
//                                 post:postData
//                             },
//                             message:"Post is created! "
//                         })
//                     }
//                     return res.redirect('back');
//                     }
//             )
          

//     });
    
//     //  req.post_array = POST_ARRAY;
  
 
    
    
// }

module.exports.create = async function(req,res){

   try{
            // console.log(req);
    let post = await Posts.create({content:req.body.content, user: req.user.id}); // when setAuthenticationUser happen   where passport create an key of user in req ,so req.user is an user data entire
    let postData = await Posts.findById(post._id).populate('user');
    
        if(req.xhr){// ajax do xmlHttpReq
            
            return res.status(200).json({//data go to ajax as res
                data:{
                    post:postData
                },
                flashMessage:{
                      'success':"Successfully created post"
                },
                message:"Post is created! "
            })
        }
        
        req.flash('success',"Successfully created post");// we create MW work,this req.flash set to locals
        return res.redirect('back');
   }catch(err){
    // console.log(err);
    req.flash('error',err);// we create MW work,this req.flash set to locals
    return res.redirect('back');
   }

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

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id : req.params.id,// so remove post(li element) from html page using js 
                },
                flashMessage:{
                    'success':"Successfully deleted post and comments associated with it!"
                },
                message:'delete post'// message for ajax req
            });
        }
        req.flash('success',"Successfully deleted post and comments associated with it!");// we create MW work,this req.flash set to locals
        return res.redirect('back');
    
     }
 } catch (error) {
    // console.log(error,'while destroying post in post controller');
    req.flash('error',error);// we create MW work,this req.flash set to locals
    return res.redirect('back');
 }
}


//to 