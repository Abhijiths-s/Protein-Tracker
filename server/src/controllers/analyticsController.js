import prisma from "../config/db.js";

// Returns daily totals for last `days` days (default 7)
export const getAnalytics = async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const days = parseInt(req.query.days) || 7;

        const user = await prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Build date range
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (days - 1));
        startDate.setHours(0, 0, 0, 0);

        // Fetch all logs in range (with food)
        const logs = await prisma.log.findMany({
            where: {
                userId: user.id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: { food: true },
            orderBy: { date: "asc" },
        });

        // Build a map: dateString -> { protein, calories }
        const dailyMap = {};

        // Pre-fill every day in range with 0s
        for (let i = 0; i < days; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            const key = d.toISOString().split("T")[0]; // "YYYY-MM-DD"
            dailyMap[key] = { date: key, protein: 0, calories: 0 };
        }

        // Accumulate log data into each day
        logs.forEach((log) => {
            if (!log.food) return;
            const key = new Date(log.date).toISOString().split("T")[0];
            if (!dailyMap[key]) return;
            dailyMap[key].protein += (log.quantity / 100) * log.food.proteinPer100g;
            dailyMap[key].calories += (log.quantity / 100) * log.food.caloriesPer100g;
        });

        const result = Object.values(dailyMap).map((d) => ({
            ...d,
            protein: parseFloat(d.protein.toFixed(1)),
            calories: parseFloat(d.calories.toFixed(0)),
        }));

        res.json({
            data: result,
            targetProtein: user.targetProtein,
            targetCalories: user.targetCalories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
