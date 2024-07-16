import React from "react";
import "./CustomCarousel.css";

const CustomCarousel = () => {
  return (
    <main className="video-container container-fluid px-0">

      <div className="overlay"></div>

      <video className="video-element" autoPlay loop muted>
        <source
          src="https://americasbestrestaurants.com/assets/u/video/header_video_%20January_2022.mp4"
          
        />
        Your browser does not support the video tag.
      </video>

      <section className="text-container col-6">

        <h1 className="main-text">
          Delicious <strong>Moments</strong>
        </h1>

        <h1 className="sub-text">
          at The Gourmet Experience
        </h1>

        <p className="caption">Where every meal is a celebration</p>
        
      </section>
      
    </main>
  );
};

export default CustomCarousel;
