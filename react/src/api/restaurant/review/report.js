import axios from "../../../axios";

export const addUserReport = async (report, restaurant_location_id) => {
  try {
    console.log(report)
    const response = await axios.post(`/reports`, {
      restaurant_location_id,
      report,
    });
    return response;
  } catch (error) {
    console.error("An error occurred during adding rating", error);
    throw error;
  }
};
