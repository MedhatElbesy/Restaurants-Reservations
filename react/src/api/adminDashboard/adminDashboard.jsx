import axios from "../../axios";

// Restaurants
export const getRestaurants = async () => {
  try {
    const response = await axios.get('/restaurants');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch restaurants", error);
    throw error;
  }
};



// Update a restaurant
export const updateRestaurant = async (id, restaurantData) => {
  try {
    const response = await axios.put(`/restaurants/${id}`, restaurantData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update restaurant with id ${id}`, error);
    throw error;
  }
};


// Disable a restaurant

//Owners
export const getOwners = async () => {
  try {
    const response = await axios.get('/reports');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch owners", error);
    throw error;
  }
};
//Reservations
export const getReservations = async () => {
  try {
    const response = await axios.get('/reservations');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations", error);
    throw error;
  }
};
//Locations
export const getLocations = async () => {
  try {
    const response = await axios.get('/locations');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch locaions", error);
    throw error;
  }
};
//cities
export const getCities = async () => {
  try {
    const response = await axios.get('/cities');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cities", error);
    throw error;
  }
};
//governoments
export const getGovernorates = async () => {
  try {
    const response = await axios.get('/governorates');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch governorates", error);
    throw error;
  }
};
//countries
export const getcountries = async () => {
  try {
    const response = await axios.get('/countries');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries", error);
    throw error;
  }
};
// Reports
export const getReports = async () => {
  try {
    const response = await axios.get('/reports');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reports", error);
    throw error;
  }
};

// Ratings
export const getRatings = async () => {
  try {
    const response = await axios.get('/ratings');
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

