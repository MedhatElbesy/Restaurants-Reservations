import React from 'react';
import './RestaurantImages.css';

const RestaurantImages = ({ images }) => {
  return (
    <section className='restaurant-details row my-5'>

        <header> 
             <h2 className='text-light text-center'>Your Restaurant Images</h2>
        </header>

      {images.length ? (
        images.map((image) => (
          <div key={image.id} className=" text-center image-wrapper my-5">
            <img src={image.image_url} alt="img" />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}

   </section>
  );
};

export default RestaurantImages;
