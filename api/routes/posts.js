import express from 'express'
import { createPost } from '../controllers/postControllers.js'
import { userExits } from '../utils/userExists.js';

const router = express.Router()

router.post("/createPost", userExits, createPost);

export default router