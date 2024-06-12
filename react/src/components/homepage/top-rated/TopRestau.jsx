import React from 'react'
import CardSlick from '../card/CardSlick';
import Card from '../card/Card';
import './TopRestau.css';

export default function TopRestau() {
  
  const restaurants = [
    { name: 'Restaurant 1', image: '/images/banner_3.jpg' },
    { name: 'Restaurant 2', image: '/images/restaurant4.jpg' },
    { name: 'Restaurant 3', image: '/images/image_slide1.jpg' },
    { name: 'Restaurant 4', image: '/images/banner_3.jpg' },
    { name: 'Restaurant 5', image: '/images/g8@2x.jpg' },
  ];
  
   
  return (
    <>
    <main className='restau'>
     <h1 
      className=' row text-center custom-color my-5'>
      Top Rated Restaurants
     </h1>

     <CardSlick>
      
        {restaurants.map((restaurant, index) => (
          <div
           key={index}
           className="restaurant-slide">
            <Card
            name={restaurant.name}
            image={restaurant.image} />
          </div>
        ))}

     </CardSlick>
     </main>
    </>
  );
};