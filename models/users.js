const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');



const userSchema = new mongoose.Schema({
    //less important last(decreasing order) write
   email: {
            type:String,
            required:true,
            unique:true
    },
   password: {
            type:String,
            required:true,
           
       },
    name: {
            type:String,
            required:true,
           
    },
    avatarFilePath:{//avatar file location store here as string
        type:String
    }
},{timestamps:true});


//set destination location for storage
let storage=multer.diskStorage({
        destination:function(req,file,cd){
                cd(null,path.join(__dirname,'..',AVATAR_PATH));
        },
        filename:function(req,file,cb){
                cb(null,file.fieldname + '-' + Date.now());//+ because filename as string no path

        }
})
//static method(oops concept , that it  constant for all)
//upload user avatar to multer an method create for it always use in controller to upload avatar to disk storage with multer help
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
// console.log(userSchema.static.uploadedAvatar,"avatar upload user schema");//return an mw func
//single means at once store same name file 


userSchema.statics.avatar_path = AVATAR_PATH;
//db store that path/location where file stored,so static method use at user controller to set userSchema field as avatar = this path

//this methods same for all , never change its value,gie same output to all

const User = mongoose.model('Users',userSchema);

module.exports = User;