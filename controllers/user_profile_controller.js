const Friends = require('../models/friendship');//collection/model import -req(func)---> odm (mongoose use to connect to mongodb) (sol query convert our req to do) -instruction-> mongodb
const Users = require('../models/users');

module.exports.addFriend = async function(req,res){
    console.log(' *user Friend Id',req.body.friendID);
    try {
    //check already friend or not,if yes remove friend from req user,if no create new document in collection of Friends
        let deletedFriend=false;
        let user = await Users.findOne(req.user._id).populate('friends');//return obj(find one)
        // let friend = user.friends.find(function(element){
        // return element.to_user=req.body.friendID});
        let friend;
        for(let element of  user.friends ){
            if(element.to_user == req.body.friendID){
                friend=element;
                break;
            }
        }

        // let friend = Friends.find({ from_user:req.user._id,
        //      to_user:req.body.friendID});
             console.log('user ',user,' *user Friend ',friend );// friend.schema.tree
        //   console.log(' *user ', user);
        //   friend=deletedFriend;
        if(friend){
            //remove friend
            user.friends.pull({_id:friend._id});
            user.save();// save in model db , push,pull,array func
            await Friends.findOneAndDelete({_id:friend._id});
            deletedFriend=true;
            console.log('delete');

        }else{
            //create new friends
            let newFriendship = await Friends.create({ from_user:req.user.id, to_user:req.body.friendID});
            user.friends.push(newFriendship._id);
            user.save();
            deletedFriend=false;

            let userh = await Users.findOne(req.user._id).populate('friends');//return obj(find one)
       
            console.log("newFriendship",newFriendship,'user here',userh);

        }
        // return res.redirect('back');

            //all req xhr
            return res.status(200).json({
                message:" Request Successfully",
                data:{
                   addToFriend:deletedFriend //true=added,false removed
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:" Internal Server Error",
        });
    }
    
}