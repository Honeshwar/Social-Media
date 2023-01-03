// const express = require('express');
// // here require not import an new express module ( not create an new instance express module) , here same instance of express module is require that firstly require at index.js(main) file 

// // that done automatically by Node.js
// // one module only  once  is been imported entire project
// // if we import again than same instance is share in that file
// // that done automatically by Node.js

// const router = express.Router();
// //class constructor call an obj create and exports to main index.js
// // it divide router from controllers
// console.log(`Router is running :`` ${router}`)

// module.exports = router;

// _______________________

const express = require('express');
const router = express.Router();

//have to import controller action (function) for router ,present separate folder
const homeController = require('../controllers/home_controller')




console.log(`Router is running : ${router}`)

router.get('/',homeController.home);

router.get('/profile',homeController.profile);

module.exports = router;