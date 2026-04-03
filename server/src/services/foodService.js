import prisma from "../config/db.js";
import { fetchFoodFromAPI } from "./externalAPI.js";

export const searchFoods = async (query) =>{
    //Check DB
    let foods = await prisma.food.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            }
        }
    });

    //if found from db return

    if (foods.length > 0){ 
        return foods;
    }
    
    //FETCHING FROM EXTERNAL API
    console.log("Not in db ,fetching from USDA API ...")

    const apiData = await fetchFoodFromAPI(query);

    if (!apiData) {
        return [];
    }
    
    //Save to DB
    const newFood = await prisma.food.create({
        data: apiData
    });

    return [newFood];
};

