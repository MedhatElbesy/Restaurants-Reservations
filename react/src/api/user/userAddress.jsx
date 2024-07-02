import axios from '../../axios';

export const addUserAddress = async (userId,data) => {
    try {
  
      const response = await axios.post(`/user/${userId}/addresses`, data);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while adding user address", error);
      throw error;
    }
  };


  export const updateUserAddress = async (userId,addressId,data) => {
    try {
  
      const response = await axios.post(`/user/${userId}/addresses/${addressId}?_method=PUT`, data);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while update user address", error);
      throw error;
    }
  };


  export const fetchUserAddress = async (userId,addressId) => {
    try {
  
      const response = await axios.get(`/user/${userId}/addresses/${addressId}`);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while fetching user address", error);
      throw error;
    }
  };



  export const deleteUserAddress = async (userId,addressId) => {
    try {
  
      const response = await axios.delete(`/user/${userId}/addresses/${addressId}`);
      
      return response.data; 
    } catch (error) {
      console.error("An error occurred while delete user address", error);
      throw error;
    }
  };