import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSlick from "../card/CardSlick";
import Card from "../card/Card";
import { fetchNearestRestaurants } from "../../../slices/restaurant/nearest-restaurants/nearestRestaurants";
import { NavLink } from "react-router-dom";
import { decryptData } from "../../../helpers/cryptoUtils";

const NearRestau = () => {
  const dispatch = useDispatch();
  const userId = decryptData("userId");
  const { data: nearestRestaurantsData, status, error } = useSelector(
    (state) => state.nearestRestaurants
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchNearestRestaurants());
    }
  }, [userId]);

 

  if (status === 'failed') {
    return (
      <p className="text-center mb-5 text-sec fs-4">
       
      </p>
    );
  }

  if (nearestRestaurantsData.length === 0) {
    return (
      <p className="text-center mb-5 text-sec fs-4">
        
      </p>
    );
  }

  return (
    <main className="restau">
      {nearestRestaurantsData.length > 3 && (
        <section className="row my-5">
          <h1 className="col-10 mx-3 my-5">Nearest Restaurants</h1>
          <CardSlick>
            {nearestRestaurantsData.map((restaurant, index) => {
              const restaurantImage = restaurant.images.length
                ? restaurant.images[0].image
                : null;
              return (
                restaurantImage && (
                  <div key={index} className="restaurant-slide">
                    <NavLink
                      to={`/restaurant/${restaurant.id}`}
                      className="nav-link"
                    >
                      <Card name={restaurant.restaurant} image={restaurantImage} />
                    </NavLink>
                  </div>
                )
              );
            })}
          </CardSlick>
        </section>
      )}
    </main>
  );
};

export default NearRestau;
