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
  
  export const addLocation= async (data) => {
    try {
  
      const response = await axios.post(`/restaurantslocations`, data);
      return response.data; 
    } catch (error) {
      console.error("An error occurred while adding location", error);
      throw error;
    }
  };


  export const addTable= async (data) => {
    try {
  
      const response = await axios.post(`/tables`, data);
      return response.data; 
    } catch (error) {
      console.error("An error occurred while adding table", error);
      throw error;
    }
  };
  

  