const express = require('express');
const  router = express.Router()// MW provide

router.use('/posts',require('./posts')); // MW move to req to one file to another
module.exports = router;