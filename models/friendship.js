const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    from_user:{//user that do friend req 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },

    to_user:{//friend, the user who accept this req
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
},{timestamps:true});

const Friends = mongoose.model('Friends',friendshipSchema);
module.exports = Friends;