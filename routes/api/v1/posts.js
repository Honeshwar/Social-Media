const express = require('express');
const  router = express.Router();// MW provide
const controllers = require('../../../controllers/api/v1/posts');
//child POV , .. --> now child = parent and parent = its parent
//parent POV , .. --> now parent = its parent, cd to one up// path upto new parent and all file and folder we can access


const passport = require('passport');
router.get('/',controllers.index); 
router.delete('/:id',passport.authenticate('jwt',{session:false} ),controllers.destroy);// id pass in res as key value (as what we send in param)
//strategy jwt
// decrypt token and verify user at payload of jwt token
//false because we don't want to be generated session cookie
//an auth(mw func) with it help it verify that jwt token client header have or not ,have toh it is user in db or not
module.exports = router;




// localhost:8000/api/v1/posts