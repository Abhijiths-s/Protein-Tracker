import prisma from "../src/config/db.js";

async function main() {
  await prisma.food.createMany({
    data: [
      {
        name: "Egg",
        caloriesPer100g: 155,
        proteinPer100g: 13
      },
      {
        name: "Chicken Breast",
        caloriesPer100g: 165,
        proteinPer100g: 31
      },
      {
        name: "Rice",
        caloriesPer100g: 130,
        proteinPer100g: 2.7
      }
    ]
  });

  console.log("Seed data inserted ✅");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });