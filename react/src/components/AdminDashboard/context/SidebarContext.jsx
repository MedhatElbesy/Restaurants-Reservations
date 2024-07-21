import React, { createContext, useReducer } from 'react';
import sidebarReducer from '../reducer/sidebarReducer';

const initialState = {
    isSidebarOpen: true,
};

export const SidebarContext = createContext(initialState);

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sidebarReducer, initialState);

    const toggleSidebar = () => {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
    };

    return (
        <SidebarContext.Provider value={{ ...state, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
