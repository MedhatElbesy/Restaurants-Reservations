import axios from '../../axios';

export const register = async (first_name, last_name, email, password, mobile_number, gender, profile_image, birth_date) => {
  try {
    const response = await axios.post(`/register`, {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      gender,
      profile_image,
      birth_date
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // Re-throw the error to handle it where register function is called
  }
};
