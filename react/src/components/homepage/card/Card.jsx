import React, { useContext } from 'react';
import './Card.css';
import { BodyColorContext } from '../../../BodyColorContext';

export default function Card({ name, image }) {
  const { bodyColor} = useContext(BodyColorContext);
  return (
    <>
    <main className='row'>
       <div className=" restaurant-card my-5 col-md-0 col-12">
        <img style={{height:'40vh' ,width:'20vw'}} src={image} alt={name} />
        <h3 style={{ color: bodyColor === 'light' ? '#333' : '#ca8e46' }}>{name}</h3>
      </div>
      </main>

    </>
  )
}
