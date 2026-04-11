import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", verifyFirebaseToken, getDashboard);

export default router;