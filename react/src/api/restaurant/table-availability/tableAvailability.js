import axios from "../../../axios";

const EndPoint = "/table-availabilities";

export const getAvailability = async (tableId) => {
  try {
    const response = await axios.get(`/table-availabilities/${tableId}`);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during fetching table availability data",
      error
    );
    throw error;
  }
};

export const addAvailability = async (availableData) => {
  try {
    const response = await axios.post(`${EndPoint}`, availableData);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during adding table availability data",
      error
    );
    throw error;
  }
};

export const updateAvailability = async (availabilityId, availableData) => {
  try {
    const response = await axios.post(
      `${EndPoint}/${availabilityId}/?_method=PUT`,
      availableData
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during updating table availability data",
      error
    );
    throw error;
  }
};

export const deleteAvailability = async (availabilityId) => {
  try {
    const response = await axios.delete(`${EndPoint}/${availabilityId}`);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during deleting table availability data",
      error
    );
    throw error;
  }
};

export const getAvailabilityById = async (tableAvailabilityId) => {
  try {
    const response = await axios.get(`/table-availability/${tableAvailabilityId}`);
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred during fetching table availability data",
      error
    );
    throw error;
  }
};