import axios from "../../axios";

const EndPoint = "/reservations";

export const makeCheckout = async (checkoutData) => {
  try {
    const response = await axios.post(`${EndPoint}`, checkoutData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred during making reservation", error);
    throw error;
  }
};

export const getAllReservations = async (restaurantId) => {
  try {
    const response = await axios.post(
      `getReservationsByRestaurantId/${restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred during making reservation", error);
    throw error;
  }
};
