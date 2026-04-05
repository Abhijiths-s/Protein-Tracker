import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import prisma from "../config/db.js";
import { getNutritionGoal ,calculateBMI} from "../services/healthService.js";

const router = express.Router();

router.post("/create",verifyFirebaseToken, async (req, res) => {
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
});

router.post("/setup",verifyFirebaseToken, async (req, res) => {
  try {
    const {uid} = req.user;
    const {weight, height, goal} = req.body;

    const user = await prisma.user.update({
      where: {
        firebaseUid: uid,
      },
      data: {
        weight,
        height,
        goal,
      },
    });
    const bmiData = calculateBMI(weight, height);
    console.log(bmiData);

    const goalData = getNutritionGoal(weight, goal);
    console.log(goalData);
    console.log(goal);
    console.log(weight);



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
});

export default router;


