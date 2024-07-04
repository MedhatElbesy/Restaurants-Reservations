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
  const data = new FormData();
  data.append("first_name", userData.first_name);
  data.append("last_name", userData.last_name);
  data.append("email", userData.email);
  data.append("password", userData.password);
  data.append("password_confirmation", userData.password_confirmation);
  data.append("mobile_number", userData.mobile_number);
  data.append("gender", userData.gender);
  data.append("profile_image", userData.profile_image);
  data.append("birth_date", userData.birth_date);
  data.append("role_name", userData.role_name);
  try {

    for (let pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    const response = await axios.post(`/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
