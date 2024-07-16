import React, { useContext } from 'react';
import './Card.css';


export default function Card({ name, image }) {
 

  return (
    <div
      className="restaurant-card-container"

    >
      <main className="row">
        <div className="restaurant-card my-5 col-md-12 col-12">
          <img src={image} alt={name} />
          <h4 className='text-decoration-none'>{name}</h4>
        </div>
      </main>
    </div>
  );
}
