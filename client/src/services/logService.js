import api from "./api";

export const addLog = async (data) => {
    const res = await api.post("/api/logs", data);
    return res.data;
};

export const getDailyTotals = async () => {
    const res = await api.get("/api/logs/totals");
    return res.data;
};