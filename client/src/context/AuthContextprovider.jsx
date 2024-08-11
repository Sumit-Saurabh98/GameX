import React, { createContext, useState } from 'react';



export const authContext = createContext();

function AuthContextProvider({ children }) {
    const [price, setPrice] = useState(0);
    const [item, setItem] = useState(1)

    const changePrice = (p) => {
        setPrice(p)
    }

    const changeTotalItem = (i) => {
        setItem(i)
    }

    

   const toggleAuthTrue = () => {
   localStorage.setItem("gamexAuth", "true");
}

const toggleAuthFalse = () => {
    localStorage.removeItem("gamexAuth");
}

const setUserRole = () => {
    localStorage.setItem("userRole", "seller");
}


    

    const value = { toggleAuthTrue, toggleAuthFalse, setUserRole, price, changePrice, item, changeTotalItem };
    
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;
