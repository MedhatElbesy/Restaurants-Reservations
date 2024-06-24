import axios from '../../axios';

export const register = async (first_name,last_name,email, password,mobile_number,gender,profile_image,birth_date) => {
    const response = await axios.post(`/register`, { first_name,last_name,email, password,mobile_number,gender,profile_image,birth_date });
    return response.data;
  };