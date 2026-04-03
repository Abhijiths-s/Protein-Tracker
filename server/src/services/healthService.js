export const calculateBMI = (weight, height) => {
    const bmi = weight / (height * height);
    
    let category = "";

    if(bmi<18.5) category = "Underweight";
    else if(bmi<25) category = "Normal";
    else if(bmi<30) category = "Overweight";
    else category = "Obese";

    return {
        bmi : bmi.toFixed(2),
        category
    };
};

export const getNutritionGoal = (weight) => {
    const proteinMin = weight *0.8;
    const proteinMax = weight * 2.2;

    const calories = weight * 30;

    return {
        protein:{
            min: proteinMin.toFixed(2),
            max: proteinMax.toFixed(2)
        },
        calories
        };
    };



