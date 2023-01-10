const express = require('express');
const  router = express.Router();// MW provide
const controllers_users_api = require('../../../controllers/api/v1/users');

router.post('/create-session',controllers_users_api.createSession);

module.exports = router;