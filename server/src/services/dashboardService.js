import prisma from "../config/db.js";

export const getDailyStats = async (userId) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // logs for today

    const logs = await prisma.log.findMany({
        where: {
            userId,
            date: {
                gte: todayStart,
                lte: todayEnd
            }
        },
        include: {
            food: true
        }
    });

    let totalCalories = 0;
    let totalProtein = 0;

    logs.forEach(log =>{

        if(!log.food) return;
        
        const protein = (log.quantity / 100) * log.food.proteinPer100g;
        const calories = (log.quantity / 100) * log.food.caloriesPer100g;

        totalCalories += calories;
        totalProtein += protein;
    });

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    
    const targetProtein = user.targetProtein || 0;
    const targetCalories = user.targetCalories || 0;

    console.log(targetCalories);
    console.log(targetProtein);


    const percentage = targetProtein ?
        (totalProtein / targetProtein) * 100 : 0;

    return {
        totalCalories,
        totalProtein,
        targetProtein,
        targetCalories,
        percentage:Math.min(percentage,100),
        logs
    
    
    };
}