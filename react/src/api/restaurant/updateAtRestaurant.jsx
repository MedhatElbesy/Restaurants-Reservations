import axios from '../../axios';





export const updateRestaurant = async (restaurantId, formData) => {
    try {
      const response = await axios.post(`/restaurants/${restaurantId}?_method=PATCH`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('An error occurred while updating the restaurant', error);
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


export const updateMenuCategory = async (menuCategoryId, data) => {
  try {
      const response = await axios.put(`/menu-categories/${menuCategoryId}`, data);
      return response.data;
  } catch (error) {
      console.error("An error occurred while updating MenuCategory", error);
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
  


  export const updateMenuItem = async (MenuItemId, data) => {
    try {
  
      const response = await axios.put(`/menu-items/${MenuItemId}`, data);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while updating menu item", error);
      throw error;
    }
  };
  

  export const updateLocation = async (locationId, data) => {
    try {
  
      const response = await axios.post(`/restaurantslocations/${locationId}?_method=PUT`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while updating location", error);
      throw error;
    }
  };
  

 
  export const updateTable = async (tableId, data) => {
    try {
  
      const response = await axios.post(`/tables/${tableId}?_method=PATCH`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while updating table", error);
      throw error;
    }
  };
  

  export const editRestaurantCategory= async (categoryId, data) => {
    try {
        const response = await axios.put(`/restaurant-categories/${categoryId}`, data);
        return response.data;
    } catch (error) {
        console.error("An error occurred while updating Category", error);
        throw error;
    }
  };



  export const updateTableImage = async (imageId, data) => {
    try {
  
      const response = await axios.post(`/table-images/${imageId}?_method=PATCH`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while updating image", error);
      throw error;
    }
  };