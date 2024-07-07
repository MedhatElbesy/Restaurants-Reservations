import { connect, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import "./RestaurantHome.css";
import { decryptData } from "../../../helpers/cryptoUtils";

export default function Home() {
  const { restaurant } = useSelector((state) => state.restaurant);
  const { restaurantId } = useParams();

  console.log(decryptData("token"));
  return (
    <section>
      <article className="header row flex-column justify-content-between p-md-5 p-3"
      style={{  background: `url(${restaurant.cover})
    center center/cover`}}>
        <div className="">
          <h1 className="text-sec">{restaurant.name}</h1>
          <p className="text-main mx-5 w-75 fs-4">{restaurant.slug}</p>
        </div>
        <p className="text-main w-75 sec-font fs-3">
          {restaurant.description}{" "}
        </p>
        <div>
          <NavLink to={`/restaurant/${restaurantId}/branches`}>
            <button className="more w-auto px-3 py-2 rounded-1 fs-5">
              Reserve Table Now
            </button>
          </NavLink>
        </div>
      </article>
      <article className="reserve row flex-column justify-content-between p-md-5 p-3">
        <div className="">
          <h2 className="text-main fs-1 mb-5">{restaurant.title}</h2>
          <p className="text-sec fs-4">{restaurant.summary}</p>
        </div>
        <div>
          <NavLink to={`/restaurant/${restaurantId}/menu`}>
            <button className="reserver-button px-3 py-2 fs-6 mt-3">
              View Menu
            </button>
          </NavLink>
        </div>
      </article>
    </section>
  );
}
