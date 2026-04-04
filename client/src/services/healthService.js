import api from "./api";

export const calculateBMI = async (data) => {
    const res = await api.post("/api/health/bmi", data);
    return res.data;
};

export const calculateGoal =async (data) => {
    const res = await api.post("/api/health/goal", data);
    return res.data;
};