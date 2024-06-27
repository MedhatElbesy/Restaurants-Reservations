import axios from '../../axios';

export const state= async (cityId) => {
    try {
        const response = await axios.get(`/states/${cityId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching  state", error);
        throw error;
    }
};