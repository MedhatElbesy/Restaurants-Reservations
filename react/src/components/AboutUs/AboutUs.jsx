import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  

  return (
    <div className="about-container my-5">
      <div className="about-content my-5">
        <h1
          className="about-title"
        >
          About Us
        </h1>
        <p
          className="about-description text-dark" 
        >
          Welcome to our restaurant reservation website! We, a group of
          enthusiastic students from the ITI, are passionate about creating a
          convenient and user-friendly platform to streamline your dining
          experience.
          <br />
          <strong
            className="p-1 about-description text-dark" 
          >
            {" "}
            Make Reservations with Ease:
          </strong>
          Our website allows you to effortlessly search for restaurants, browse
          menus, and secure reservations at your desired time and date. You can
          even manage your reservations and receive confirmation notifications
          all in one place.
          <br/>
          <strong
            className="mt-1 p-1 about-description text-dark"
          >
            Dedicated to Your Satisfaction:  
          </strong>
           We are committed to providing a seamless and enjoyable reservation
          process. Whether you're planning a special occasion or a casual night
          out, our website empowers you to make the most of your dining
          experience.
        </p>
      </div>
    </div>
  );
}
