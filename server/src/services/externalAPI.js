export const fetchFoodFromAPI = async (query) => {
    const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&api_key=${process.env.USD_API_KEY}`
    );
    const data = await res.json();

    if(!data.foods || data.foods.length === 0){
        return null;
    }

    const food= data.foods[0];

    //nutrients

    let calories =0;
    let proteins=0;

    food.foodNutrients.forEach((nutrient) => {
        if (nutrient.nutrientName === "Energy") {
            calories = nutrient.value;
        }
        if (nutrient.nutrientName === "Protein") {
            proteins = nutrient.value;
        }
    });

    return {
        name: food.description,
        caloriesPer100g: calories,
        proteinPer100g: proteins,
    };
};