import { calculateBMI } from "../services/healthService.js";
import { getNutritionGoal } from "../services/healthService.js";
import prisma from "../config/db.js";


export const getBMI = (req, res) => {
    const { weight, height } = req.query; 

    const result = calculateBMI(weight, height);

    res.json(result);
};

export const getUserGoal = async (req, res) => {
    const {userId} = req.query;
    
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const result = getNutritionGoal(user.weight, user.goal);

    res.json(result);
};