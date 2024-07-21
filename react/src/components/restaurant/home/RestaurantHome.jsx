import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import "./RestaurantHome.css";
import { useState } from "react";

export default function Home() {
  const { restaurant } = useSelector((state) => state.restaurant);
  const { restaurantId } = useParams();
  const [clickedImage, setClickedImage] = useState(null);

  return (
    <section className="restaurant-home">
      <article
        className="header row flex-column justify-content-between p-md-5 p-3"
        style={{
          background: `url(${restaurant.cover}) center center/cover`,
        }}
      >
        <div className="z-3">
          <h1 className="text-light">{restaurant.name}</h1>
          <p className="text-main mx-5 w-75 fs-4">{restaurant.slug}</p>
        </div>
        <p className="text-light w-75 sec-font fs-3">
          {restaurant.description}
        </p>
        <div>
          <NavLink to={`/restaurant/${restaurantId}/branches`}>
            <button className="btn-reserve w-auto px-3 py-2 rounded-1 fs-5">
              Reserve Table Now
            </button>
          </NavLink>
        </div>
      </article>
      <article className="py-5 gallery">
        {restaurant.images.map((image) => (
          <figure
            key={image.id}
            onClick={() => setClickedImage(image.image_url)}
          >
            <img src={image.image_url} alt="restaurant images" />
          </figure>
        ))}
        {clickedImage && (
          <div className="show-image" onClick={() => setClickedImage(null)}>
            <span onClick={() => setClickedImage(null)}>X</span>
            <img src={clickedImage} alt="restaurant images" />
          </div>
        )}
      </article>
      <article className="reserve row flex-column justify-content-between p-md-5 p-3">
        <div className="">
          <h2 className="text-main fs-1 mb-5">{restaurant.title}</h2>
          <p className="text-sec fs-4">{restaurant.summary}</p>
        </div>
        <div>
          <NavLink to={`/restaurant/${restaurantId}/menu`}>
            <button className="btn-menu px-3 py-2 fs-6 mt-3">View Menu</button>
          </NavLink>
        </div>
      </article>
    </section>
  );
}
