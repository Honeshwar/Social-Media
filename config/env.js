
let development = {
//index.js (main)
    name:'development',
    assets_path:'./assets',
    session_secret:'ko',
//passport jwt , api
    jwt_secret:'hi',
//passport google
    google_client_id:"850782517174-40ebe3hmcpkcgb1d7komn7hfo67ho2r4.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/user/auth/google/callback",
//smtp obj in nodemailer
    smtp:{
        service:"gmail",
        host:'smtp.gmail.com',
        port:587,//protocol  port . TLS = 587
        secure:false,
        auth:{// remotely access nodemailer our(pass , gmail and password) gmail and send from our gmail an email to users 
            user:"forprojext517@gmail.com",
            pass:"vagdfxsoomuileoz"//"wlljrtecnxlbhwsd"

        }
    },
//mongoose
    db:'CODE_SOCIAL_DEVELOPMENT'

}

let production = {

}

module.exports = development;