import axios from '../../axios';

export const updateUserData = async (userId, formData) => {
  try {
    const response = await axios.post(`/profile/update/${userId}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during updating user data", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};


export const changePassword= async (formData) => {
  try {
    const response = await axios.post(`/change-password`, formData);
    return response.data;
  } catch (error) {
    console.error("An error occurred change password", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

