import React, { useState, useEffect } from 'react';
import './CustomCarousel.css';

const CustomCarousel = () => {
    const [titleIndex, setTitleIndex] = useState(0);
    const titles = ['Taste the Diversity of Cuisine', 'Discover a World of Flavor', 'Every Meal Tells a Story'];

    useEffect(() => {
        const titleInterval = setInterval(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 8050);

        return () => {
            clearInterval(titleInterval);
        };
    }, [titles.length]);

    return (
        <main className="video-container container-fluid px-0">

            <div className="overlay"></div>

            <section className="row">
                <video 
                className="col-12"
                 autoPlay
                 loop
                 muted>

                    <source
                     src="https://matchthemes.com/demowp/caverta/wp-content/uploads/video-home.mp4"
                     type="video/mp4" />
                     Your browser does not support the video tag.
                
                </video>
            </section>

            <section className="row">
                <header className="col-12">
                    <h1 className="my-5 display-5">
                        {titles[titleIndex]}
                    </h1>
                </header>
            </section>

        </main>
    );
};

export default CustomCarousel;
