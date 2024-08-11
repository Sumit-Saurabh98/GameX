import React, { createContext, useState, useEffect } from 'react';



export const authContext = createContext();

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [price, setPrice] = useState(0);
    const [item, setItem] = useState(1)

    const changePrice = (p) => {
        setPrice(p)
    }

    const changeTotalItem = (i) => {
        setItem(i)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuth(true);
        }
    }, []); 

    const logOut = () => {
        localStorage.clear();
        setAuth(false);
    }

    const toggleAuth = () => {
        setAuth(true)
    }


    

    const value = { auth, logOut, toggleAuth, price, changePrice, item, changeTotalItem };
    
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;
