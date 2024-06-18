import axios from '../../axios';


export const getUserDataById = async (userId) => {
    try {
        const response = await axios.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching user data", error);
        throw error;
    }
};
