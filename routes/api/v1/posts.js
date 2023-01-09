const express = require('express');
const  router = express.Router()// MW provide
const controllers = require('../../../controllers/api/v1/posts')
router.get('/',controllers.index); 

module.exports = router;