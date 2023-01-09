const express = require('express');
const  router = express.Router()// MW provide
const controllers = require('../../../controllers/api/v2/posts')
router.get('/',controllers.index); 

module.exports = router;