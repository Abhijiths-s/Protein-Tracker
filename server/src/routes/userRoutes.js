import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { createUser, setupUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create",verifyFirebaseToken, createUser);
router.post("/setup",verifyFirebaseToken, setupUser);


export default router;


