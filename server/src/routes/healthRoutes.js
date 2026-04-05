import express from "express";
import { getBMI } from "../controllers/healthController.js";
import { getUserGoal } from "../controllers/healthController.js";

const router = express.Router();

router.get("/bmi", getBMI);
router.post("/goal", getUserGoal);
router.get("/goal", getUserGoal);



export default router;