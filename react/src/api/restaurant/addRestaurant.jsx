import axios from '../../axios';



export const addMenuItem = async (data) => {
    try {
  
      const response = await axios.post(`/menu-items`, data);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while adding menu item", error);
      throw error;
    }
  };
  

  export const addMenuCategory = async (data) => {
    try {
  
      const response = await axios.post(`/menu-categories`, data);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while adding menu category", error);
      throw error;
    }
  };
  