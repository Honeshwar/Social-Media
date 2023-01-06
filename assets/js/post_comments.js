//  //block scope so overriding of variable not take place
// console.log('hi post comment .js');
// {
//     //fetch form element so comment data i will sent to server using aja(no reload)
//     let commentForm = $(' .create-comment');
//     console.log(commentForm);
//     // console.log( $('.create-comment input:last').prop('value'));//both work
//     // console.log( $('.create-comment input:last').attr("value")); 
//     //default event behavior of form on submit i will remove and create an behavior on submit that is an ajax req
//     //event listener on submit
//     let size = commentForm.length;
//     // for(let i=0;i<size;i++){
        
//         commentForm[0].submit(function(e){//listener func
//             // console.log(form.serialize());
//             e.preventDefault;//e an event behavior on submit by default
    
//             //do ajax req ,than go to comment controller to send back an res to ajax
//             // $.ajax({
//             //     method:'POST',
//             //     url:'/comment/create',//complete router
//             //     data:commentForm[0].serialize(),//convert to json formate
//             //     success:function(jsonResData){//that we post to server data as res get
//             //         console.log(jsonResData);
    
//             //     },error:function(jsonResError){
//             //         console.log(jsonResError);
//             //     }
    
    
//             // });
//         })
//     // }
    
// }


 
  
let noty = function (flashMessage){
    new Noty({
        theme:'metroui',
        text:`${flashMessage.success}`,
        type:"success",
        layout:'topRight',
        timeout:1500
    }).show();

}