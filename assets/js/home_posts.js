// send data from form to server using ajax
//block scope so overriding of variable not take place use this {}

//**************** create add/delete to post **********************************
{
    // save post  in db and create an post inside posts section in  DOM
     let createPost = function(){
    
        let new_post = $('#creating-new-post');

        new_post.submit(function(e){
            e.preventDefault();// by default action on click remove,now click nothing happen until do ajax req
        
            $.ajax({
                type:'POST',
                url:"/post/create",//this req in browser
                data:new_post.serialize(),// data in form convert in json form like that we do express.urlencoded()
                success:function(resDataFromServer){
                   
                    let newPost = newPostDom(resDataFromServer.data.post);
                    $('#posts-list-container > ul').prepend(newPost);
                    notification(resDataFromServer.flashMessage);
                    //initialize listener on delete link to ajax create post in DOM also + again(firstly when script is interpret) to all DOM delete post link/btn 
                    deletePost();
                   //initialize listener to create comment forms , when ever post created
                    createComment();
                    createLike();

                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        })
     
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        //an jquery obj return
        // console.log(post._id,'post id****')
        return $(`<li style="list-style:none" id="post-${post._id}" value="${post.user._id}">  
        <fieldset>
            <legend>Post Details</legend>
                    <!-- for delete post and check for button show to whom user who create post, form req not work so no need to add condition ajax do,this file ony work when user login ho ga(interpret) -->
            
                        <small>
                            <a class="delete-post-button" href="/post/destroy/${post._id}">Destroy Post</a>
                        </small>
            
                        <small>
                                    <form action="/likes/toggle/?id=${post._id}&type=post" method="post"  class="likes">
                                       <button type="submit"><small class="counts">0 </small> <i class="fas fa-thumbs-up"></i></button>
                                    </form> 
                        </small>

                        <!-- post = one post in posts model or collection -->
                        <!-- content in post and name of author -->
                <p>
                    Content: ${post.content }
                    <br>
                    <small>Name : ${post.user.name }</small>
                </p>
                
                

                <!-- Comments********** -->
                <div class="post-comments">
                
                        <form action="/comment/create" class="create-comment" method="post">
                            <input type="text" name="content" placeholder="Type here to add comment....." required>
                            <!-- for getting post_id in comment to populate for this post -->
                            <input type="hidden" name="post_id" value="${post._id}">
                            <button type="submit">Add Comment</button>
                        </form>
                
                </div>
                
                <!-- no need for auth. to see post and comments -->
                <div class="post-comments-list">
                    <ul id="${post._id}">
                    
                    </ul>
                
                </div>  
                    
                    

        </fieldset>
     </li> `);
    }

    // method to delete post from DOM
    let deletePost = function(){
        // console.log(deleteLink);
        let delButtons = $('.delete-post-button');
        console.log(delButtons,"deletePost2");
    
        let size = delButtons.length;
        for(let i=0;i<size;i++){
           delButtons[i].addEventListener('click',function(e){
                e.preventDefault();
                console.log("deletePost2");
                $.ajax({
                    method:'GET',
                    url:delButtons[i].getAttribute('href'),// plane js func
                    success:function(deletePostData){
                        console.log(deletePostData);
                        $(`#post-${deletePostData.data.post_id}`).remove();
                      notification(deletePostData.flashMessage);
                    },error:function(errorWHileDelete){
                        console.log(errorWHileDelete.responseText);//err is an json formate get from server and so errorWHileDelete an json obj inside it error content present,that why responseText
                    }
    
                })
            })
    
        }
    }
    
    
        deletePost();  
        createPost();
    


//**************** create add/delete to comment **********************************
  

        //create comment and store using ajax in server db
        let convertFormToJson = function(form){
            let data = $(form)
            .serialize();
            return data;
        }

        //method to create a comment in DOM
        let createComment = function(){
            let commentForm = $('.create-comment');
            console.log(commentForm);
            
            let size = commentForm.length;
            console.log(size);     
            for(let i=0;i<size;i++){
                commentForm[i].addEventListener('submit',function(e){// create listener to all form
                            e.preventDefault();   
            
                console.log( convertFormToJson( commentForm[i]));
                    
                            // do ajax req ,than go to comment controller to send back an res to ajax
                    $.ajax({
                        method:'POST',
                        url:'/comment/create',//complete router
                        data:convertFormToJson( commentForm[i]),//convert to json formate
                        success:function(jsonResData){//that we post to server data as res get

                            console.log(jsonResData,"response****");
                            element =  addCommentToDOM(jsonResData.data.comment);
                            //i set an post id to comment list container id with id="post-comment-..."
                            $ (`.post-comments-list > ul[id= "${jsonResData.data.comment.post}"]`).prepend(element);//.post-comments-list  class because each post having ths container inside comments.So, i create it class
                            notification(jsonResData.flashMessage);
                            deleteComment();//initialize listener
                            createLike();

                            
                        },error:function(jsonResError){
                            console.log(jsonResError);
                        }
            
            
                    });
                });
            }        
            
        }
        //add comment to DOM
        let addCommentToDOM = function(comment){
        //an jquery obj create that is alikeForm[i]ement of html
        return $(`
        <li id="comment-${comment._id}">
            <fieldset>
        
                <legend>Comment </legend>
                    <p>
                       
                            <small>
                                <a class="delete-comment-btn" href="/comment/destroy/${comment._id}">Destroy Comment</a>
                            </small>
                      
                           
                              
                            <small>
                                <form action="/likes/toggle/?id=${comment._id}&type=comment" method="post"  class="likes">
                                <button type="submit"><small class="counts">0</small> <i class="fas fa-thumbs-up"></i></button>
                                </form> 
                            </small>
        
                        Comment on post : ${comment.content}
                    
                        <small>Author of Comment : ${comment.user.name}</small>
                        <!-- post.user that create post and comment.user that user who do comment -->
                    </p>   
            </fieldset>
        </li> `)
         }


        let deleteComment = function(){
            // console.log(deleteLink);
            let delButtons = $('.delete-comment-btn');
            console.log(delButtons,"deletecomment2");
        
            let size = delButtons.length;
            for(let i=0;i<size;i++){
            delButtons[i].addEventListener('click',function(e){
                    e.preventDefault();
                    console.log("deletePost2");
                    $.ajax({
                        method:'GET',
                        url:delButtons[i].getAttribute('href'),// plane js func
                        success:function(deleteCommentData){
                            console.log(deleteCommentData);
                            $(`#comment-${deleteCommentData.data.comment_id}`).remove();
                        notification(deleteCommentData.flashMessage);
                        },error:function(errorWHileDelete){
                            console.log(errorWHileDelete.responseText);//err is an json formate get from server and so errorWHileDelete an json obj inside it error content present,that why responseText
                        }
        
                    })
                })
        
            }
        }
     
        createComment(); // because i want listener on already exist html element m during page reload/render
        deleteComment(); 


    // due hoisting it go up
    let notification = function(flashMessage){
        new Noty({
            theme:'metroui',
            text:`${flashMessage.success}`,
            type:"success",
            layout:'topRight',
            timeout:1500
        }).show();
    }


    // delete all posts
    let deleteAll = $('#delete-all-post')
    deleteAll.click(function(e){
        e.preventDefault();
        let id=  deleteAll.prop('value');
        console.log( $('li[value]'));
       let all_posts = $('li[value]');

       $.ajax({
        method:'GET',
        url:'/post/deleteAll',// give value present at href(unique due to post id pass at link)
        success:function(res){
            console.log(res);
           
          notification(res.flashMessage);
        },error:function(errorWHileDelete){
            console.log(errorWHileDelete.responseText);//err is an json formate get from server and so errorWHileDelete an json obj inside it error content present,that why responseText
        }

    })
       for(let id of all_posts){
        id.remove();
       }
    });



    // ajax req to for likes

    let createLike = function(){

        let likeForm = $('.likes');
        let count = $('.likes button small');
        let btn = $('.likes button');
        console.log (count)
    
        
        for(let i=0;i<likeForm.length;i++){
    
            likeForm[i].addEventListener("submit",function(e){
                e.preventDefault();
    
                $.ajax({
                    method:"POST",
                    url: likeForm[i].getAttribute('action'),
                    success:function(resDataJson){
                        console.log (likeForm[i])
                        //display on DOM
                        if(resDataJson.data.deleted){
                            a= `${resDataJson.data.postLikes.likes.length} `;//array length
                            btn[i].style.backgroundColor="lightgray";
                             return count[i].innerText=a;
                        }else{
                           a= `${resDataJson.data.postLikes.likes.length} `;
                           btn[i].style.backgroundColor="lightblue";
                            return count[i].innerText=a;
            
                        }
                        
                    },error:function(resErrorJson){
                        return console.log(resErrorJson.responseText);
                    }
                }) 
            })
        } 
       
    
        }
        createLike();
    
}
