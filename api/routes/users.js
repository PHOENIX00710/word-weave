import express from 'express'
import { googleSignup, signinHelper, signup } from '../controllers/userControllers.js'

const router = express.Router()

router.post("/signup",signup)
router.post("/signin",signinHelper)
router.post("/google",googleSignup)

export default router