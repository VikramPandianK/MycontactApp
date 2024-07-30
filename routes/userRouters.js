const express = require('express');
const router = express.Router();
const {getAllUsers,registerUser,loginUser,currentUser} = require('../controller/userController');
const validationToken = require('../middleware/validationHandler');


router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').get(validationToken,currentUser);

module.exports = router;