import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataById } from '../../../slices/user/fetchUserSlice';
import { decryptData } from '../../../helpers/cryptoUtils';


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userId = decryptData('userId'); 
  const { data, loading, error } = useSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUserDataById(userId));
  }, [userId]);

  return (
    <UserContext.Provider value={{ data, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
