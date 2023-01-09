const express = require('express');
const  router = express.Router();// MW provide
const controllers = require('../../../controllers/api/v1/posts');
//child POV , .. --> now child = parent and parent = its parent
//parent POV , .. --> now parent = its parent, cd to one up// path upto new parent and all file and folder we can access

router.get('/',controllers.index); 
router.delete('/:id',controllers.destroy);// id pass in res as key value (as what we send in param)

module.exports = router;


// localhost:8000/api/v1/posts