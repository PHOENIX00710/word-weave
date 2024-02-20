import express from 'express'
import { deleteUser, googleSignup, signOut, signinHelper, signup, updateUserDetails } from '../controllers/userControllers.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signinHelper)
router.post("/google", googleSignup)
router.put("/updateDetails", updateUserDetails)
router.delete("/removeUser", deleteUser)
router.get("/signout", signOut)

export default router