import axios from "../../axios";

// Reports
export const getReports = async () => {
  try {
    const response = await axios.post('/reports');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reports", error);
    throw error;
  }
};

// Ratings
export const getRatings = async () => {
  try {
    const response = await axios.post('/ratings');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch ratings", error);
    throw error;
  }
};


// comments
export const getComments = async () => {
  try {
    const response = await axios.get('/comments');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments", error);
    throw error;
  }
};