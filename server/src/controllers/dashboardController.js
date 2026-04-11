import prisma from "../config/db.js";
import { getDailyStats } from "../services/dashboardService.js";

export const getDashboard = async (req, res) => {
    try{
        const firebaseUid = req.user.uid;

        const user = await prisma.user.findUnique({
            where: {
                firebaseUid
            }
        });

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }


        const stats = await getDailyStats(user.id);
       

        res.json(stats);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
};