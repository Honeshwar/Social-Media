  //an action create of an router
  module.exports.profile = function(req,res){
  return res.end("<h1> We are at profile</h1>")
  }

  module.exports.email = function(req,res){
  return res.end("<h1>Email</h1>")
  }

  module.exports.signIn = function(req,res){
  return res.render('user_signIN',{title:'Sign In'});
  }


  module.exports.signUp = function(req,res){
  return res.render('user_signUp',{title:'Sign Up'});
  }

  // get the sign up data    
  module.exports.create = function(req,res){
  //todo after cookies
  }

  //  
  module.exports.create_session = function(req,res){
//  todo
  }
    
  