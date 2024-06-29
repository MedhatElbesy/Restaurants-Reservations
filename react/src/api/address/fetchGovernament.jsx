import axios from '../../axios';


export const governorate = async (countryId) => {
    try {
        const response = await axios.get(`/governorates/${countryId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching  governorate ", error);
        throw error;
    }
};