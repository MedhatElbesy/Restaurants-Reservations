import React from 'react';


export default function Circles() {
  return (
    <main className="circle-container my-5 mx-2">
      <div className="circle mx-1" style={{ backgroundImage: `url('./images/3.jpg')` }}>
        <div className="overlay-text">Savor</div>
      </div>
      <div className="circle  mx-1" style={{ backgroundImage: `url('./images/5 (1) - Copy.jpg')` }}>
        <div className="overlay-text">Share</div>
      </div>
      <div className="circle  mx-1" style={{ backgroundImage: `url('./images/1 (4).jpg')` }}>
        <div className="overlay-text">Enjoy</div>
      </div>
    </main>
  );
}
