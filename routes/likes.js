const express = require('express');//same instance use that first import that manage by nodejs (give that instance ),cool to use library

const router = express.Router();// provide MW,use to go from on router to another,use other files
const likesController = require('../controllers/likes');

router.post('/toggle',likesController.toggleLike);


module.exports = router;