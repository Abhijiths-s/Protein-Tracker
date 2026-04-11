import { searchFoods } from "../services/foodService.js";

export const searchController = async (req, res) => {

    try{
        const {query} = req.query;
        
        const foods = await searchFoods(query);
        res.json(foods);
    }
    catch(err){
        res.status(500).json({error:err.message});
    
    }
}