import React from 'react';
 import { createContext, useState } from 'react';

 export const filterContext = createContext()

function FilterContext({children}) {
    const [screen, setScreen] = useState("")
    const [color, setColor] = useState("")
    const [sort, setSort] = useState("")

    const screenChange = (screenSize) => {
        setScreen(screenSize)
    }

    const colorChange = (color) => {
        setColor(color)
    }

    const sortChange = (sort) => {
        setSort(sort)
    }

    const value = {screen, screenChange, sort, colorChange, color, sortChange}
    return (
        <filterContext.Provider value={value}>
            {children}
        </filterContext.Provider>
    );
}

export default FilterContext;