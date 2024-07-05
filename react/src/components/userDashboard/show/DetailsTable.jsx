import React from 'react';
import { useRestaurantContext } from '../RestaurantContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';

const DetailsTable = () => {
  const { restaurant } = useRestaurantContext();

  if (!restaurant) {
    return <Loader />;
  }

  return (
    <main className="details-section my-5 col-10 offset-1">

       <h2 className="my-4 text-center" style={{ fontSize: '2rem' }}>
            {restaurant.name}
            <Link 
             to={`/edit-restaurant/${restaurant.id}`} 
             className="float-end text-white"
            >

              <FontAwesomeIcon icon={faEdit} className="me-2 text-warning" />
            
            </Link>
       </h2>

      <div
        className="cover-image position-relative"
        style={{
          backgroundImage: `url('/images/barista-making-coffee-F2GU6L8.jpg')`,
          backgroundSize: 'cover',
          height: '80vh',
        }}
      >
        <div className="overlay-content position-absolute top-0 start-0 end-0 bottom-0">
          

          <section className="details-section text-center text-white">

              <h3>{restaurant.title}</h3>
              <p>{restaurant.summary}</p>
              <p>{restaurant.description}</p>
            
            <div
              className=" details-color  mb-3"
              style={{ position: 'absolute', bottom: '20px', left: '20px' }}
            >
              <p>{restaurant.hot_line}</p>
            </div>

            
          </section>

        </div>

        <div className="logo-image position-absolute top-0 start-0">
         {restaurant.logo && (
          <img src={restaurant.logo} alt="Logo" className="img-fluid " />
          )}
        </div>


      </div>

    </main>
  );
};

export default DetailsTable;
