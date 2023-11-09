const express = require("express");
const { getAllUser, createUser, loginUser } = require("../controller/userController");

const router = express.Router();

router.get('/', getAllUser)
router.post('/register-user', createUser)
router.post('/login', loginUser)

module.exports = router;