//just action to an router define here 
// action = function

module.exports.home = function(req,res){
    return res.render('home',{title:'Home'});
    // RENDER FUN. CALL VIEW ENGINE AND FIND HOME AT VIEW FOLDER(WHOSE PATH WE SET(SPECIFY)) AND RENDER IT
//  return res.end("<h1>Controller is up, using express, we are at home</h1>")
}

    //we know controller take req and res 
    // variable store func. expression reference
    // exports obj
    // syntax way to export
    

module.exports.user = function(req,res){
    return res.end("<h1>Controller is up, using express, we are at User</h1>")
    }


//just for understanding something
module.exports.profile = function(req,res){
    return res.render('home',{title:'Profile'});
   }
    
       