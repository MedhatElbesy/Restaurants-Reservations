import React, { useContext } from "react";
import { BodyColorContext } from "../../BodyColorContext";
import "./AboutUs.css";

export default function AboutUs() {
  const { bodyColor } = useContext(BodyColorContext);

  return (
    <div className="about-container">
      <div className={`about-content `}>
        <h1
          className={`about-title text-${
            bodyColor === "light" ? "secondary" : "yello-var"
          }`}
        >
          About Us
        </h1>
        <p
          className={`about-description text-${
            bodyColor === "light" ? "dark" : "light"
          }`}
        >
          Welcome to our restaurant reservation website! We, a group of
          enthusiastic students from the ITI, are passionate about creating a
          convenient and user-friendly platform to streamline your dining
          experience.
          <br />
          <strong> Make Reservations with Ease:</strong> Our website allows you
          to effortlessly search for restaurants, browse menus, and secure
          reservations at your desired time and date. You can even manage your
          reservations and receive confirmation notifications all in one place.
          <strong>Dedicated to Your Satisfaction:</strong> We are committed to
          providing a seamless and enjoyable reservation process. Whether you're
          planning a special occasion or a casual night out, our website
          empowers you to make the most of your dining experience.
        </p>
      </div>
    </div>
  );
}
