import React from 'react';
import { useRestaurantContext } from '../RestaurantContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';

const DetailsTable = () => {
  const { restaurant } = useRestaurantContext();

  if (!restaurant) {
    return <Loader/>;
  }

  return (

    <main className="details-section my-5 col-10 offset-1">

      <div className="card-style">

        <h2 className="my-4 text-center">
          Details
          <Link to={`/edit-restaurant/${restaurant.id}`} className="float-end text-white">
            <FontAwesomeIcon icon={faEdit} className="me-2 text-warning" />
          </Link>
        </h2>

        <section className="row">


          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Logo</header>

              <div className="card-body">
                {restaurant.logo ? (
                   <img src={restaurant.logo} alt="Logo" className="img-fluid" />
                ) : (
                  <p className="card-text">N/A</p>
                )}
              </div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Cover</header>

              <div className="card-body">
                {restaurant.cover ? (
                  <img src={restaurant.cover} alt="Cover" className="img-fluid" />
                ) : (
                  <p className="card-text">N/A</p>
                )}
              </div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Name</header>

              <div className="card-body">{restaurant.name}</div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Title</header>

              <div className="card-body">{restaurant.title}</div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Summary</header>

              <div className="card-body">{restaurant.summary}</div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Hot Line</header>

              <div className="card-body">{restaurant.hot_line}</div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Description</header>

              <div className="card-body">{restaurant.description}</div>

            </div>

          </section>

          <section className="col-md-4">

            <div className="card mb-3 my-card">

              <header className="card-header">Status</header>
              
              <div className="card-body">{restaurant.status}</div>

            </div>

          </section>

        </section>

      </div>
      
    </main>
  );
};

export default DetailsTable;
