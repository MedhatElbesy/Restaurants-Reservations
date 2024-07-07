import axios from "../../axios";

export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axios.get(`/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching restaurant data", error);
    throw error;
  }
};

export const getAllRestaurant = async () => {
  try {
    const response = await axios.get(`/restaurants`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching restaurant data", error);
    throw error;
  }
};

export const categoryById = async (categoryId) => {
  try {
    const response = await axios.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching category data", error);
    throw error;
  }
};

export const menuCategoryById = async (menuCategoryId) => {
  try {
    const response = await axios.get(`/menu-categories/${menuCategoryId}`);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during fetching menu category data",
      error
    );
    throw error;
  }
};

export const menuCategory = async () => {
  try {
    const response = await axios.get(`/menu-categories`);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during fetching menu category data",
      error
    );
    throw error;
  }
};

export const menuItemById = async (menuItemId) => {
  try {
    const response = await axios.get(`/menu-items/${menuItemId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching menu item data", error);
    throw error;
  }
};


export const locationById = async (locationId) => {
    try {
        const response = await axios.get(`/location/${locationId}`);
        return response.data;
    } catch (error) {
        console.error("An error occurred during fetching location data", error);
        throw error;
    }
};

export const tableById = async (tableId) => {
  try {
      const response = await axios.get(`/tables/${tableId}`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching table data", error);
      throw error;
  }
};


export const fetchAllCategory = async () => {
  try {
      const response = await axios.get(`/categories`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching categories", error);
      throw error;
  }
};


export const fetchAllRestaurantCategoryById = async (categoryId) => {
  try {
      const response = await axios.get(`/restaurant-categories/${categoryId}`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching restaurant category data", error);
      throw error;
  }
};


export const fetchTableImageById = async (imageId) => {
  try {
      const response = await axios.get(`/table-images/${imageId}`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching table images data", error);
      throw error;
  }
};

export const specificCategory = async () => {
  try {
      const response = await axios.get(`/category/cur-user`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching your category data", error);
      throw error;
  }
};



export const restaurantCategory = async (restaurantId) => {
  try {
      const response = await axios.get(`/restaurant/${restaurantId}/category`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching restaurant category data", error);
      throw error;
  }
};

export const nearestRestaurants = async (userId) => {
  try {
      const response = await axios.get(`/nearest-locations/${userId}`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching nearest restaurant data", error);
      throw error;
  }
};


export const topRestaurants = async () => {
  try {
      const response = await axios.get(`/top-rated-restaurants`);
      return response.data;
  } catch (error) {
      console.error("An error occurred during fetching top restaurant data", error);
      throw error;
  }
};