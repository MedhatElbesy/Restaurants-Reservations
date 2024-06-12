import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


export default function Footer() {
  return (
    <>
      <footer className="footer text-center text-white">
        <div className="container py-4 footer-data">
          <section className="mb-4">
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a className="btn btn-outline-light m-1" href="#!" role="button">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </section>

          <section className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">About Us</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="#!" className="text-white text-decoration-none">Home</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Contact</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Email</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Services</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="#!" className="text-white text-decoration-none">Service 1</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Service 2</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Service 3</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Support</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="#!" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Help Center</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Support</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Follow Us</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="#!" className="text-white text-decoration-none">Facebook</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Twitter</a></li>
                <li><a href="#!" className="text-white text-decoration-none">Instagram</a></li>
              </ul>
            </div>
          </section>
        </div>

        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <p>
          © 2020 Copyright:Restau
          </p>
        </div>
      </footer>
    </>
  );
}

