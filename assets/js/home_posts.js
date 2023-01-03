// send data from form to server using ajax

{
     let createPost = function(){
    
        let new_post = $('#creating-new-post');

        new_post.submit(function(e){
            e.preventDefault();// by default action on click remove,now click nothing happen until do ajax req
        
            $.ajax({
                type:'POST',
                url:"/post/create",//this req in browser
                data:new_post.serialize(),// data in form convert in json form like that we do express.urlencoded()
                success:function(resDataFromServer){
                    console.log(resDataFromServer);
                    let newPost = newPostDom(resDataFromServer.data.post) ;
                    console.log(newPost,"hi")
                    $('#posts-list-container ul').prepend(newPost);
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
        return $(`<li style="list-style:none" id="post-${post.id}">  
        <fieldset>
            <legend>Post Details</legend>
                    <!-- for delete post and check for button show to whom user who create post, form req not work so no need to add condition ajax do,this file ony work when user login ho ga(interpret) -->
            
                        <small>
                            <a class="delete-post-button" href="/post/destroy/${post.id}">Destroy Post</a>
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
                
                        <form action="/comment/create" method="post">
                            <input type="text" name="content" placeholder="Type here to add comment....." required>
                            <!-- for getting post_id in comment to populate for this post -->
                            <input type="hidden" name="post_id" value="${post._id}">
                            <button type="submit">Add Comment</button>
                        </form>
                
                </div>
                
                <!-- no need for auth. to see post and comments -->
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    
                    </ul>
                
                </div>  
                    
                    

        </fieldset>
    </li> `);
    }

    createPost();

}