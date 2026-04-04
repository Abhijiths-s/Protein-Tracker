import api from "./api";
 
export const searchFoods = async (query) => {
    const res = await api.get(`/api/foods?query=${query}`);
    return res.data;
};