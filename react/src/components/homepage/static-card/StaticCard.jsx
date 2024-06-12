import React, { useEffect, useRef } from 'react';
import './StaticCard.css';

export default function StaticCard() {
  
  const contentRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      const content = contentRef.current;
      const rect = content.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        content.classList.add('slide-in');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="row static-container my-5 restau">

      <aside className="col-md-5 col-12">
        <div>
          <img
           src="/images/banner_3.jpg" 
           alt="Restaurant" />
        </div>
      </aside>

      <aside className="col-md-7 col-12">
        <div 
        ref={contentRef} 
        className='slide-content text-light'>
          <h1 className='col-12 text-center'>Welcome to Our Restaurant Guide!</h1>
          <p
           className='col-12 text-center'>
            Discover the best places to eat in town. Whether you're looking for cozy restaurants,
             a fine dining experience, or a casual eatery, we've got you covered.
             Check out some of our top recommendations</p>
        </div>
      </aside>

    </main>
  );
}
