import axios from '../../axios'

export const updateUserData = async (userId, data) => {
    try {
        const response = await axios.put(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred during updating user data", error);
        throw error;
    }
};