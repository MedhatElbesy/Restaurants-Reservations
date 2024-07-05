import React, { createContext, useContext } from 'react';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ restaurantId, restaurant, children }) => {
  return (
    <RestaurantContext.Provider value={{ restaurantId, restaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantContext = () => {
  return useContext(RestaurantContext);
};
