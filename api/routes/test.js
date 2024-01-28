import express from "express";
import { test, test1 } from "../controllers/test.js";

const router =express.Router()

router.get("/",test1)
router.get("/test",test)

export default router