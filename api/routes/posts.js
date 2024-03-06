import express from 'express'
import { createPost, deletePost, getAllPosts, updatePostDetails } from '../controllers/postControllers.js'
import { userExits } from '../utils/userExists.js';

const router = express.Router()

router.post("/createPost", userExits, createPost);
router.get("/getPosts",getAllPosts);
router.put("/updatePost/:postID/:userID", userExits, updatePostDetails);
router.delete("/deletePost/:postID/:userID", userExits, deletePost)

export default router