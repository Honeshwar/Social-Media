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

