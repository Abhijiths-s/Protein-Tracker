import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

//request interceptors

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptors

api.interceptors.response.use(
    (response) =>response,
    (error) => {
        console.error("API Error:",error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const getUserGoal = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/health/goal?userId=${userId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch user goal");
    }
    return res.json();

}
export default api;

