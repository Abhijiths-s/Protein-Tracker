import { addLog } from "../services/logService.js";
import { getDailyTotals } from "../services/logService.js";
import prisma from "../config/db.js";

export const getTotals = async (req, res) => {
    try{
        const {userId, date} = req.query;

        const totals = await getDailyTotals(userId, date);

        res.json(totals);
    }catch(error){
        res.status(400).json({error: error.message});
    }   
};


export const createLog = async (req, res) => {

    try{
        const firebaseUid = req.user.uid;
        const { foodId, quantity} = req.body;
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const user = await prisma.user.findUnique({
            where: {
                firebaseUid
            }
        });



        const result = await addLog(user.id, foodId, quantity);

        res.json(result);
    }catch(error){
        res.status(400).json({error: error.message});
    }

};

export const deleteLog = async (req, res) => {
    try{
        const firebaseUid = req.user.uid;
        const logId = Number(req.params.id);

        // user finding
        const user= await prisma.user.findUnique({
            where: {
                firebaseUid
            }
        });

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        //ownership finding

        const log = await prisma.log.findUnique({
            where: {
                id: logId
            }
        });

        if (!log || log.userId !== user.id) {
            return res.status(403).json({error: "Unauthorized to delete this log"});

        }

        await prisma.log.delete({
            where: {
                id: logId
            }
        });

        res.json({message: "Log deleted successfully"});

    }catch(error){
        res.status(500).json({error: error.message});
    }
        
}
