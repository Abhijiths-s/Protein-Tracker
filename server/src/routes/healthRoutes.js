import express from "express";
import { getBMI } from "../controllers/healthController.js";
import { getGoal } from "../controllers/healthController.js";

const router = express.Router();

router.get("/bmi", getBMI);
router.post("/goal", getGoal);


export default router;