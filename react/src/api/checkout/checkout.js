import axios from "../../axios";

const EndPoint = "/reservations";

export const makeReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${EndPoint}`, reservationData);
    return response.data;
  } catch (error) {
    console.error("An error occurred during making reservation", error);
    throw error;
  }
};
