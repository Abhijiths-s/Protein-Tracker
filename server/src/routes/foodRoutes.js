import express from "express";
import { getFoods } from "../controllers/foodController.js";
import { searchController } from "../controllers/searchController.js";
const router = express.Router();

router.get("/", getFoods);
router.get("/search",searchController);

export default router;