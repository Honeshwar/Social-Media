const nodeMailer = require('nodemailer');// protocol , mail ,  help to use
const ejs = require('ejs');
const path = require('path');

// create reusable transporter object using the default SMTP transport

// an obj where communication of an server to mailer(gmail service) define here 
//set all need thing  for how an transportation of an mail happen
let transporter = nodeMailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,//protocol  port . TLS = 587
    secure:false,
    auth:{
        user:"",
        pass:""

    }
});


//create template using ejs
//email create that will be dynamic using ejs(html+style+js)
//data ejs file /data

let renderTemplate = function(data,relativePath){//rp sender path
    let mailHTML;
    ejs.renderFile(path.join(__dirname,"../views/mailers",relativePath) , data , function(err,template){
        if(err){console.log('err in rendering template of mail');return;}

        mailHTML = template;
    });
    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}