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
      role_name:userData.role_name
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during register in", error);
    throw error;
  }
};


export const forgetPasswordUser = async (email) => {
  try {
    const response = await axios.post("/forget-password", { email });
    return response.data;
  } catch (error) {
    console.error("An error occurred during forget password", error);
    throw error;
  }
};

export const resetPasswordUser = async (token, password, password_confirmation) => {
  try {
    const response = await axios.post("/reset-password", {
      token,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during reset password", error);
    throw error;
  }
};
