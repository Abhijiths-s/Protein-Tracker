import prisma from "../config/db.js";
import { searchFoods } from "../services/foodService.js";

export const getFoods = async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({error:"Query is required"});
  }

  const foods =await searchFoods(query);
  res.json(foods);
};