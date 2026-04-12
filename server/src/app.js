import express from "express";
import prisma from "./config/db.js";
import dotenv from "dotenv";
import foodRoutes from "./routes/foodRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import cors from "cors";

const app=express();


app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
}));




dotenv.config();



app.use(express.json());

app.get("/",(req,res)=> {
    res.send("API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);
});

app.get("/test-db", async (req, res) => {
    const foods= await prisma.food.findMany();
    res.json(foods);
});

app.use("/api/foods", foodRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);



console.log("Routes loaded")

// console.log(process.env.USD_API_KEY);