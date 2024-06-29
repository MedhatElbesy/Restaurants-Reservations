import axios from "../../axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("An error occurred during log in", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`/register`, {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      mobile_number: userData.mobile_number,
      gender: userData.gender,
      profile_image: userData.profile_image,
      birth_date: userData.birth_date,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during register in", error);
    throw error;
  }
};
