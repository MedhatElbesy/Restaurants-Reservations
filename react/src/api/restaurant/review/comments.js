import axios from "../../../axios";

export const getCommentsByRestaurantId = async (restaurantId) => {
  try {
    const response = await axios.get(`/api/comments/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching restaurant data", error);
    throw error;
  }
};
