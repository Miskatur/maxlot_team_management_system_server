const express = require("express");

const { validateToken } = require("../utils/authTokenUtils");
import { Request, Response } from 'express';
import { createUser, deleteUser, getAllUser, loginUser } from '../controller/userController';
const router = express.Router();

router.get('/', getAllUser)
router.post('/login', loginUser)
router.post('/register-user', createUser)
router.delete('/delete-user/:id', deleteUser)


export default router