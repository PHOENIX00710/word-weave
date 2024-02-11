import express from 'express'
import { signinHelper, signup } from '../controllers/userControllers.js'

const router = express.Router()

router.post("/signup",signup)
router.post("/signin",signinHelper)

export default router