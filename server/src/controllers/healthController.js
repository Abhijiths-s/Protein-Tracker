import { calculateBMI } from "../services/healthService.js";
import { getNutritionGoal } from "../services/healthService.js";

export const getBMI = (req, res) => {
    const { weight, height } = req.query; 

    const result = calculateBMI(weight, height);

    res.json(result);
};

export const getGoal = (req, res) => {
    const { weight } = req.query;

    const result = getNutritionGoal(weight);

    res.json(result);
};