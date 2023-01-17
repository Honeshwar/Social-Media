const express = require('express');
const router = express.Router();

const profileController = require('../controllers/user_profile_controller');


//add friend
router.post('/addFriend',profileController.addFriend);

module.exports = router;//mw use to (help url to move from one router code to another), /1part/2part/3part
//an layer that move req to another file so req will fullfil ( execute line of code for actual rq(url))