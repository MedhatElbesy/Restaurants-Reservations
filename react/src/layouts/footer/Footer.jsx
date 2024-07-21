import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import { faEnvelope, faInfoCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
  return (
    <>
      <footer className=" myfooter text-center text-white">
        <div className="container py-4 footer-data">
          <section className="mb-4">
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon className="text-secandary"icon={faTwitter} />
            </a>
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faInfoCircle} />
            </a>
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <a className="btn btn-outline-secondary m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faShieldAlt} />
            </a>
          </section>

          <section className="row footer-section text-center my-4">
           <div className=" col-md-3 ">
            <ul className="list-unstyled mb-0  ">
             <li><a href="#!" className="text-decoration-none"><strong className='text-secondary'>Email</strong></a></li>
             <li><a href="#!" className="text-dark text-decoration-none">Restau@gmail.com</a></li>
            </ul>
           </div>

           <div className="col-md-3  ">
            <ul className="list-unstyled mb-0 ">
             <li><a href="#!" className="text-decoration-none"><strong className='text-secondary '>Contact Us</strong></a></li>
             <li><a href="#!" className="text-dark text-decoration-none">+44 20 7946 0958</a></li>
            </ul>
           </div>

           <div className=" col-md-3 ">
            <ul className="list-unstyled mb-0 ">
             <li><a href="#!" className="text-decoration-none"><strong className='text-secondary'>Help Center</strong></a></li>
             <li><a href="#!" className="text-dark text-decoration-none">+44 20 7946 0958</a></li>
            </ul>
           </div>
         </section>

        </div>

        <div className="text-center p-3 copyright">
            <p>
          © 2024 Copyright:@Restau
          </p>
        </div>
      </footer>
    </>
  );
}

