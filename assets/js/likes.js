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

   