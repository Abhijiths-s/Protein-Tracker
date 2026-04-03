import express from "express";
import prisma from "./config/db.js";
import dotenv from "dotenv";
import foodRoutes from "./routes/foodRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";




dotenv.config();


const app=express();

app.use(express.json());

app.get("/",(req,res)=> {
    res.send("API running");
});

app.listen(3000,()=> {
    console.log("Server running on port 3000");
});

app.get("/test-db", async (req, res) => {
    const foods= await prisma.food.findMany();
    res.json(foods);
});

app.use("/api/foods", foodRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/health", healthRoutes);

// console.log(process.env.USD_API_KEY);