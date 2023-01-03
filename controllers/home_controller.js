//just action to an router define here 
// action = function

module.exports.home = function(req,res){
 return res.end("<h1>Controller is up, using express, we are at home</h1>")
}

    //we know controller take req and res 
    // variable store func. expression reference
    // exports obj
    // syntax way to export
    

    module.exports.profile = function(req,res){
        return res.end("<h1>Controller is up, using express, we are at profile</h1>")
       }