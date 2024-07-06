import React, { useEffect, useState } from "react";
import echo from "./echo";

const RestaurantLocationNotifications = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    echo.private("my-channel").listen("RestaurantLocationCreated", (event) => {
      console.log("New Restaurant Location Created:", event.restaurantLocation);
      setLocations((prevLocations) => [
        ...prevLocations,
        event.restaurantLocation,
      ]);
    });

    return () => {
      echo.leave("my-channel");
    };
  }, []);

  return (
    <div>
      <h1>New Restaurant Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.address}, {location.city_id}, {location.state_id},{" "}
            {location.zip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantLocationNotifications;
