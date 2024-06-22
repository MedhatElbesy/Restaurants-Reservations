import axios from '../../axios';


export const nearestRestaurant = async (userId)=>{
    try{
        const response= await axios.get(`/restaurants/nearest/${userId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
}




export const topRated = async ()=>{
    try{
        const response=await axios.get(`/restaurants/topRated`);
        return response.data;
    }catch(error){
        console.error("An error occured while retrieving data",error);
    }
}



export const restaurantsOfUser = async (userId)=>{
    try{
        const response= await axios.get(`/restaurants/user/${userId}`);
        return response.data;
    }catch (error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getRestaurantData =async (restaurantId)=>{
    try{
    const response=await axios.get(`/restaurants/${restaurantId}`);
    return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}



export const getRestaurantLocation = async (restaurantId)=>{
    try{
        const response=await axios.get(`/restaurant-location/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}



export const getRestaurantCategory= async(restaurantId)=>{
    try{
        const response=await axios.get(`/retaurant-category/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getRestaurantImage =async(restaurantId)=>{
    try{
        const response =await axios.get(`/restaurant_location_images/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("an error occur during retrieving data",error)
    }
}


export const getMenuCategory=async(restaurantId)=>{
    try{
    const response=await axios.get(`/menu_categories/${restaurantId}`);
    return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getMenuItems =async (restaurantId)=>{
    try{
        const response=await axios.get(`/menu_items/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}




export const getTablesInfo = async(restaurantId)=>{
    try{
        const response=await axios.get(`/tables/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getAvailabilityOfTables= async (tableId)=>{
    try{
        const response=await axios.get(`/table_availabilities/${tableId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getTableImages =async(tableId)=>{
    try{
        const response=await axios.get(`/table_images/${tableId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}


export const getPayments = async(restaurantId)=>{
    try {
        const response= await axios.get(`/payments/${restaurantId}`);
        return response.data;
    }
    catch(error){
        console.error("An error occur during retrieving data",error)
    }
}