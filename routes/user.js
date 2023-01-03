const express = require('express');
const router = express.Router();
console.log(`Router2 is running `);
// controller  action import
const userController = require('../controllers/user');

router.get('/profile',userController.profile);

//same can use again Mw and move req to another router (start with /profile/change)

router.get('/email',userController.email);



module.exports = router;