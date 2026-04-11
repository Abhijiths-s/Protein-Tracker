import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { createLog } from "../controllers/logController.js";
import { getTotals } from "../controllers/logController.js";
import { deleteLog } from "../controllers/logController.js";


const router = express.Router();

router.get("/total",verifyFirebaseToken,getTotals);
router.post("/", verifyFirebaseToken, createLog);
router.delete("/:id", verifyFirebaseToken, deleteLog);
console.log("Routes Loaded")

export default router;