import { addLog } from "../services/logService.js";
import { getDailyTotals } from "../services/logService.js";

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
        const {userId, foodId, quantity} = req.body;

        const result = await addLog(userId, foodId, quantity);

        res.json(result);
    }catch(error){
        res.status(400).json({error: error.message});
    }

};