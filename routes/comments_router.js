const express = require('express');
const passport = require('passport');
const router = express.Router();// router = MW func.

const CommentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,CommentsController.create);//MW for authentication and user new get that post page

router.get('/destroy/:id',passport.checkAuthentication,CommentsController.destroy);//MW for authentication and user new get that post page

module.exports = router; // router MW as an layer use ,so req come to this file to execute 