const express = require('express');
const passport = require('passport');
const router = express.Router();// router = MW func.

const PostController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,PostController.create);//MW for authentication and user new get that post page

router.get('/destroy/:id',passport.checkAuthentication,PostController.destroy);//MW for authentication and user new get that post page
//:id means : ednote string params(normal params)

module.exports = router; // router MW as an layer use ,so req come to this file to execute 