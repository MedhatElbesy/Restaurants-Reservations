import axios from '../../axios';

export const deleteRestaurant = async (restaurantId) => {
    try {
        const response = await axios.delete(`/restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting the restaurant", error);
        throw error;
    }
};


export const deleteRestaurantLocation = async (locationId) => {
    try {
        const response = await axios.delete(`/restaurant-location/${locationId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting restaurant location", error);
        throw error;
    }
};


export const deleteRestaurantCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`/restaurant-category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting restaurant category", error);
        throw error;
    }
};


export const deleteRestaurantImage = async (imageId) => {
    try {
        const response = await axios.delete(`/restaurant-location-images/${imageId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting restaurant image", error);
        throw error;
    }
};


export const deleteMenuCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`/menu-categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting menu category", error);
        throw error;
    }
};


export const deleteMenuItem = async (menuItemId) => {
    try {
        const response = await axios.delete(`/menu-items/${menuItemId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting menu item", error);
        throw error;
    }
};


export const deleteTable = async (tableId) => {
    try {
        const response = await axios.delete(`/tables/${tableId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting table", error);
        throw error;
    }
};


export const deleteAvailabilityOfTables = async (availabilityId) => {
    try {
        const response = await axios.delete(`/table-availabilities/${availabilityId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting table availability", error);
        throw error;
    }
};


export const deleteTableImages = async (imageId) => {
    try {
        const response = await axios.delete(`/table-images/${imageId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred while deleting table images", error);
        throw error;
    }
};
