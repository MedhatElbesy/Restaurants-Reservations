import axios from '../../axios';

export const country = async () => {
    try {
        const response = await axios.get(`/countries`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching countries", error);
        throw error;
    }
};