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

export const getNutritionGoal = (weight, goal) => {
  let proteinPerKg;
  let calorieMultiplier;

  switch (goal) {
    case "gain":
      proteinPerKg = 2.0;
      calorieMultiplier = 35;
      break;

    case "loss":
      proteinPerKg = 1.5;
      calorieMultiplier = 25;
      break;
    
    case "maintain":
      proteinPerKg = 1.2;
      calorieMultiplier = 30;
      break;

    default:
      proteinPerKg = 1.2;
      calorieMultiplier = 30;
  }

  console.log("INSIDE FUNCTION:", goal, proteinPerKg);
  console.log(typeof weight);

  const protein = weight * proteinPerKg;
  const calories = weight * calorieMultiplier;

  return { protein, calories }; // ✅ VERY IMPORTANT
};

