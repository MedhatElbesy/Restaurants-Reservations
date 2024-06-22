import axios from '../../axios';


export const createRestaurant = async (data) => {
    try {
        const response = await axios.post(`/restaurants`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating a restaurant", error);
        throw error;
    }
};


export const createRestaurantLocation = async (data) => {
    try {
        const response = await axios.post(`/restaurant-location`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating restaurant location", error);
        throw error;
    }
};


export const createRestaurantCategory = async (data) => {
    try {
        const response = await axios.post(`/restaurant-category`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating restaurant category", error);
        throw error;
    }
};


export const uploadRestaurantImage = async (data) => {
    try {
        const response = await axios.post(`/restaurant-location-images`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while uploading restaurant image", error);
        throw error;
    }
};


export const createMenuCategory = async (data) => {
    try {
        const response = await axios.post(`/menu-categories`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating menu category", error);
        throw error;
    }
};


export const createMenuItems = async (data) => {
    try {
        const response = await axios.post(`/menu-items`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating menu items", error);
        throw error;
    }
};


export const createTable = async (data) => {
    try {
        const response = await axios.post(`/tables`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while creating table", error);
        throw error;
    }
};


export const setAvailabilityOfTables = async (data) => {
    try {
        const response = await axios.post(`/table-availabilities`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while setting table availability", error);
        throw error;
    }
};


export const uploadTableImages = async (data) => {
    try {
        const response = await axios.post(`/table-images`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while uploading table images", error);
        throw error;
    }
};



