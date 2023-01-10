const express = require('express');
const  router = express.Router()// MW provide

router.use('/posts',require('./posts')); // MW move to req to one file to another

router.use('/users',require('./users'));
// localhost:8000/api/v1/users/create-session

module.exports = router;


// localhost:8000/api/v1/posts