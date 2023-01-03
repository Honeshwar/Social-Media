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
            },
            error:function(err){
                console.log(err.responseText);
            }
        });
    })

}

    createPost();

}