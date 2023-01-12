const nodeMailer = require('nodemailer');// protocol , mail ,  help to use
const ejs = require('ejs');
const path = require('path');
//for email,passwords
const auth = require('../secure/email');//module/file import,{auth{email:value,}}

// create reusable transporter object using the default SMTP transport

// an obj where communication of an server to mailer(gmail service) define here 
//set all need thing  that req for transfer an email,like services,protocol,host ,our company email(from where email send automatic by nodemailer)
//from where we transfer
let transporter = nodeMailer.createTransport({//tell who is transporter,which service it use,protocols..
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,//protocol  port . TLS = 587
    secure:false,
    auth:{// remotely access nodemailer our(pass , gmail and password) gmail and send from our gmail an email to users 
        user:auth.email,
        pass:auth.password

    }
});


//create template using ejs
//email create that will be dynamic using ejs(html+style+js)
//data ejs file /data


// an func that will give use data render in an ejs file to html than pass to send email(comment_mailer.js)
let renderTemplate = function(data,relativePath){//relative path(forward part) = relative to given views/mailer, data obj(kwy-value pairs data)
    console.log(data)
    let mailHTML;
    ejs.renderFile(path.join(__dirname,"../views/mailers",relativePath) , data , function(err,template){
        if(err){console.log('err in rendering template of mail',err);return;}

        mailHTML = template;//template created
    });
    return mailHTML;
}


module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}