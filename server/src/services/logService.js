
import prisma from "../config/db.js";

export const addLog = async (userId , foodId , quantity)=> {
     //get food data

     const food =await prisma.food.findUnique({
        where: {
            id: foodId
        }
     });

     if(!food){
        throw new Error("Food not found");
     }

     //calculate nutrition
     const calories = (food.caloriesPer100g / 100) * quantity;
     const protein = (food.proteinPer100g / 100) * quantity;

     //save log

     const log = await prisma.log.create({
        data: {
            userId,
            foodId,
            quantity
        }
     });

     return {
        log,
        calories,
        protein
     
     }
}

//to get daily totals

export const getDailyTotals = async (userId,date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const logs=await prisma.log.findMany({
        where: {
            userId:Number(userId),
            date: {
                gte: start,
                lt: end
            }
        },
        include :{
            food:true
        }
    });

    let totalCalories=0;
    let totalProtein=0;

    logs.forEach((log) => {
        totalCalories += (log.food.caloriesPer100g/100)*log.quantity;
        totalProtein += (log.food.proteinPer100g/100)*log.quantity;
    });

    return {
        totalCalories,
        totalProtein
    };
        };     