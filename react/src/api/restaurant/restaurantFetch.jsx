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
