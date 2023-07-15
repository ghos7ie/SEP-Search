import React, { useState, createContext } from 'react';

export const PUContext = createContext();

export const PUContextProvider = ({ children }) => {
    const [pu, setPUs] = useState([]);
    const [searched, setSearched] = useState(false);

    return (
        <PUContext.Provider value={{ pu, setPUs, searched, setSearched }}>
            {children}
        </PUContext.Provider>
    )
}