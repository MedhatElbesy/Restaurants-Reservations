import axios from "../../axios";

const EndPoint = "/gateways";

export const getAllGateways = async () => {
  try {
    const response = await axios.get(`${EndPoint}`);
    return response.data;
  } catch (error) {
    console.error("An error occurred during making reservation", error);
    throw error;
  }
};
