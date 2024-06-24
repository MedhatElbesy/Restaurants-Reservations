import axios from '../../axios';

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
  
      const response = await axios.post(`/categories/${categoryId}?_method=PATCH`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("An error occurred while updating restaurant category", error);
      throw error;
    }
  };
