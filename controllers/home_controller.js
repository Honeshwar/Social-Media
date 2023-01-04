//just action to an router define here 
// action = function
const Post = require('../models/posts');
const Users = require('../models/users')
// const POST_ARRAY = [];
// let aboveCB_complete =false;
// module.exports.home = function(req,res){
//     //console.log(req);
// //due to asynchronous nature we set cond at return res
//     Post.find({},function(err,collection){//list (array)of data/document pass
//         if(err){
//             console.log(err,'err');
//             return;
//         }
    
//         // for(let i in collection){
//         //     POST_ARRAY.unshift(collection[i].content);//due to list collection.i.content not work eg i='0','1'.. fot notation only deal with variable type key
        
//         // }
//          res.locals.posts = collection;//collection only have post data
//          res.locals.user = req.user; //passport provide it(req.user) ,only provide when user authenticate and session cookie create than
//         // otherwise we have to use populate way , done below

//          //  console.log(res.locals);
       
//             console.log(res.locals);
//             return res.render('home',{title:'Home'});
//             // RENDER FUN. CALL VIEW ENGINE AND FIND HOME AT VIEW FOLDER(WHOSE PATH WE SET(SPECIFY)) AND RENDER IT
//         //  return res.end("<h1>Controller is up, using express, we are at home</h1>")
        
//     });
 


// }


//----without Async await and error handling----
// module.exports.home = function(req,res){
// // ref:"User" match to collection name
// //populate(field in post schema)
//     Post.find({})
//     .populate("user")
//     .populate({
//         path:'comments',//field
//         populate:{ //nested populate
//             path:'user' //inside array an comment obj field(content,""user"",post)
//         }
//     })//now than posts below store all posts and inside it user document and comments documents
//       // posts.comments,posts,posts.user 
//       // or locals.user can do also that provide passport after authenticate

//     .exec((err,posts)=>{
//         if(err){
//             console.log(err,'err');
//             return;
//         }

//         Users.find({},function(err,users){
//         //    console.log(posts[0].comments) 
//             return res.render('home',{
//                 title:"Home",
//                 posts:posts ,
//                all_users:users
//                  });
//      /* 
//      posts = { 
//                     {
//                         content:"value",
//                         user: {_id:,name:"value".....}
//                     }, 
//                     {
//                         content:"value",
//                         user: {_id:,name:"value"...}
//                     },
//                      {
//                         content:"value",
//                         user: {_id:,name:"value"...}
//                     }
//                  }
    
//                 */
//           })
           
//     });
// }

// **** without Async await and error handling ****
module.exports.home = async function(req,res){

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



    const users = await Users.find({});
    
    //output send to browser
    return res.render('home',{
        title:"Home",
        posts:posts ,
        all_users:users
    });

} catch (error) {
    req.flash('error: ',error);
    return res.render('home');
    // console.log(error,'while finding all posts and users in home action')
}
        /* 
posts = { 
{
    content:"value",
    user: {_id:,name:"value".....}
}, 
{
    content:"value",
    user: {_id:,name:"value"...}
},
    {
    content:"value",
    user: {_id:,name:"value"...}
}
}

*/

}

    //we know controller take req and res 
    // variable store func. expression reference
    // exports obj
    // syntax way to export
    

module.exports.user = function(req,res){
    return res.end("<h1>Controller is up, using express, we are at User</h1>")
    }


//just for understanding something
module.exports.profile = function(req,res){
    return res.render('home',{title:'Profile'});
   }
    
     