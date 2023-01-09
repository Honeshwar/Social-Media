module.exports.index = function(req,res){
    return res.status(200).json({  // res/json(status,obj) are deprecated instead of this use that we use
        messages:"list of items",
        posts:[]
    });
}