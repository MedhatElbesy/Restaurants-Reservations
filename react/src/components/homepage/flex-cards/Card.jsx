import React from 'react';
import './Card.css';

export default function Card() {
  return (
    <main className='flex-card restau my-5'>
      <section>
        <div className="image-container">
          <img src="/images/image_slide3.jpg" alt="Restaurant" />
        </div>
      </section>
      <section>
        <div className="image-container">
          <img src="/images/restaurant4.jpg" alt="Restaurant" />
        </div>
      </section>
      <section>
        <div className="image-container">
          <img src="/images/image_slide1.jpg" alt="Restaurant" />
        </div>
      </section>
      <section>
        <div className="image-container">
          <img src="/images/g8@2x.jpg" alt="Restaurant" />
        </div>
      </section>
      <section>
        <div className="image-container">
          <img src="/images/restaurant3.jpg" alt="Restaurant" />
        </div>
      </section>
    </main>
  );
}


