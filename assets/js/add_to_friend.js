 /********* ADD TO FRIEND ************/
 console.log('hi,********* ADD TO FRIEND ***********')
 let createFriendship = function(){

   let friendshipForm = $('#add-to-friend');
   friendshipForm.submit(function(e){
    e.preventDefault();

   })
 }

 createFriendship();