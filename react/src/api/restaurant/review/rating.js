import axios from "../../../axios";

export const getAvgRating = async (branchId) => {
  try {
    const response = await axios.get(
      `/restaurant-locations/${branchId}/average-rating`
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching branch avg rating", error);
    throw error;
  }
};

export const addUserRating = async (rate, branchId) => {
  try {
    const response = await axios.post(`/ratings`, {
      restaurant_location_id: branchId,
      rate,
      user_id: 2,
    });
    return response;
  } catch (error) {
    console.error("An error occurred during adding rating", error);
    throw error;
  }
};
