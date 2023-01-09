const express = require('express');
const  router = express.Router()// MW provide

router.use('/posts',require('./posts')); // MW move to req to one file to another
module.exports = router;


// localhost:8000/api/v1/posts