import prisma from "../config/db.js";
import { getNutritionGoal,calculateBMI } from "../services/healthService.js";

export const createUser = async (req, res) => {
     try {
    const {uid , email} = req.user;
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          {firebaseUid: uid},
          { email },
        ]
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          email,
        },
      });
    }

    res.json(user);
    }
    catch (error) {
        console.error("Create user eroor",error);
        res.status(500).json({message:error.message});
    }
};

export const setupUser = async (req, res) => {
     try {
    const {uid} = req.user;
    let {weight, height, goal} = req.body;
    
    weight = Number(weight);
    height = Number(height);

    if (isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ error: "Weight and height must be valid numbers" });
    }

    const validGoals = ["gain", "maintain", "loss"];
    if (!validGoals.includes(goal)) {
        return res.status(400).json({ error: "Invalid goal provided" });
    }



    const bmiData = calculateBMI(weight, height);
    console.log(bmiData);
    
    const goalData = getNutritionGoal(weight, goal);
    console.log(goalData);
    console.log(goal);
    console.log(weight);
    
    const user = await prisma.user.update({
      where: {
        firebaseUid: uid,
      },
      data: {
        weight,
        height,
        goal,
        targetProtein:goalData.protein,
        targetCalories:goalData.calories,
      },
    });


    res.json({
      user,
      protein:goalData.protein,
      calories:goalData.calories,
      bmi:bmiData.bmi,
      category:bmiData.category
    });
  }catch(error){
    console.error("Setup user error",error);
    res.status(500).json({message:"Error setting up user"});
  }
};