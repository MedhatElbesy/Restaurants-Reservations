import axios from '../../axios';

export const updateUserData = async (userId, data) => {
    try {
        const response = await axios.put(`/profile/update/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred during updating user data", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
        throw error;
    }
};
