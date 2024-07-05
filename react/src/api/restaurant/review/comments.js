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

export const getAllComments = async (branchId) => {
  try {
    const response = await axios.get(`/comments/${branchId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during fetching branch comments", error);
    throw error;
  }
};

export const addUserComment = async (comment, restaurant_location_id) => {
  try {
    const response = await axios.post(`/comments`, {
      restaurant_location_id,
      user_id: 2,
      comment,
    });
    return response;
  } catch (error) {
    console.error("An error occurred during adding comment", error);
    throw error;
  }
};

export const updateUserComment = async (comment, commentId) => {
  try {
    const response = await axios.post(
      `/comments/${commentId}/?method='PUT'`,
      comment
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred during updating comment", error);
    throw error;
  }
};

export const deleteUserComment = async (commentId) => {
  try {
    const response = await axios.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during deleting comment", error);
    throw error;
  }
};
