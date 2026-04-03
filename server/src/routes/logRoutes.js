import express from "express";
console.log("Routes loaded");
import { createLog } from "../controllers/logController.js";
import { getTotals } from "../controllers/logController.js";

const router = express.Router();

router.get("/total",getTotals);
router.post("/", createLog);

export default router;