const express = require("express");
const { getAllUser, createUser, loginUser, deleteUser } = require("../controller/userController");
const { validateToken } = require("../utils/authTokenUtils");

const router = express.Router();

router.get('/', getAllUser)
router.post('/login', loginUser)
router.post('/register-user', createUser)
router.delete('/delete-user/:id', deleteUser)


module.exports = router;