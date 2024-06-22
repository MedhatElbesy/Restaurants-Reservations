import axios from '../../axios';


export const getRestaurantById = async (restaurantId) => {
    try {
        const response = await axios.get(`/restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching user data", error);
        throw error;
    }
};


export const categoryById = async (categoryId) => {
    try {
        const response = await axios.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching user data", error);
        throw error;
    }
};
