import React, { createContext, useState, useEffect } from 'react';

export const BodyColorContext = createContext();

export const BodyColorProvider = ({ children }) => {
  const [bodyColor, setBodyColor] = useState('black'); 

  const toggleColor = () => {
    const newColor = bodyColor === 'light' ? 'black' : 'light';
    setBodyColor(newColor);
    updateBodyBackgroundColor(newColor);
  };

  const updateBodyBackgroundColor = (color) => {
    const body = document.querySelector('body');
    if (color === 'light') {
      body.style.backgroundColor = 'white';
    } else if (color === 'black') {
      body.style.backgroundColor = 'black';
    }
  };

  useEffect(() => {
    updateBodyBackgroundColor(bodyColor);
  }, [bodyColor]);

  return (
    <BodyColorContext.Provider value={{ bodyColor, toggleColor }}>
      {children}
    </BodyColorContext.Provider>
  );
};
