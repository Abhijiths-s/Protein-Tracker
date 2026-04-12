import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, getAnalytics);

export default router;
