import axios from '../../axios';


export const updateRestaurant = async (restaurantId, data) => {
    try {
        const response = await axios.put(`/restaurants/${restaurantId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating the restaurant", error);
        throw error;
    }
};


export const updateRestaurantLocation = async (locationId, data) => {
    try {
        const response = await axios.put(`/restaurant-location/${locationId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating restaurant location", error);
        throw error;
    }
};


export const updateRestaurantCategory = async (categoryId, data) => {
    try {
        const response = await axios.put(`/restaurant-category/${categoryId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating restaurant category", error);
        throw error;
    }
};


export const updateRestaurantImage = async (imageId, data) => {
    try {
        const response = await axios.put(`/restaurant-location-images/${imageId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating restaurant image", error);
        throw error;
    }
};


export const updateMenuCategory = async (categoryId, data) => {
    try {
        const response = await axios.put(`/menu-categories/${categoryId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating menu category", error);
        throw error;
    }
};


export const updateMenuItem = async (menuItemId, data) => {
    try {
        const response = await axios.put(`/menu-items/${menuItemId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating menu item", error);
        throw error;
    }
};


export const updateTable = async (tableId, data) => {
    try {
        const response = await axios.put(`/tables/${tableId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating table", error);
        throw error;
    }
};


export const updateAvailabilityOfTables = async (availabilityId, data) => {
    try {
        const response = await axios.put(`/table-availabilities/${availabilityId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating table availability", error);
        throw error;
    }
};


export const updateTableImages = async (imageId, data) => {
    try {
        const response = await axios.put(`/table-images/${imageId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating table images", error);
        throw error;
    }
};
