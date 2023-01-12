const nodeMailer = require('../config/nodeMailer');
const comments = require('../models/comments');
//for email,passwords
const auth = require('../secure/email');//module/file import,{auth{email:value,}}

//this is another way to exporting a method
module.exports.newComment = (Comment)=>{
    let htmlString =  nodeMailer.renderTemplate({comment:Comment},'/comments/new_comment.ejs');
    console.log('send mail from mailer');

    nodeMailer.transporter.sendMail({
        //reality email formate, from -> to -> subject -> compose email
        from:auth.email,
        to:Comment.user.email,
        subject:'new comment publishing',
        html:htmlString//content to sent,compose(write) email
    },(err,info)=>{//send email info=info
        if(err){console.log('error while send mail from mailer',err);return;}

        console.log('Message sent ',info);
        return;
    })
}

//use at comment controller for each comment an email goes form st5666 to that commented user,also use for post(create other one) 