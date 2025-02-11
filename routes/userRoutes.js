const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/userescontrollers');
const verifyJWT = require('../middlewares/verifyJWT');


router.use(verifyJWT)
router.route("/").get(usersControllers.getAllUsers);



module.exports = router;