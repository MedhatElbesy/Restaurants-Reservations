import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Loader.css';

const Loader = ({ loading }) => {
  return (
    <div className="sweet-loading d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="loader-container rounded-circle">
        <img
          src="/images/logo-color.png" 
          alt="Logo"
          className="loader-image rounded-circle"
        />
        <div className="loader-overlay rounded-circle">
          <ClipLoader
            color={" #FF6B16"}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loader"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
