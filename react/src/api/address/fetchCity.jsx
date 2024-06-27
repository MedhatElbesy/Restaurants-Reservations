import axios from '../../axios';

export const city = async (governorateId) => {
    try {
        const response = await axios.get(`/cities/${governorateId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching  city", error);
        throw error;
    }
};