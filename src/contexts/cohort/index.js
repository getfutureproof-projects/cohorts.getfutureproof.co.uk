import React, { useState, useContext } from 'react';

const CohortContext = React.createContext();

export function useCohort(){
    return useContext(CohortContext)
}

export function CohortProvider({ children }){
    const [ current, setCurrent ] = useState();

    const set = (cohort) => setCurrent(cohort);

    return (
        <CohortContext.Provider value={{ set, current }}>
            { children }
        </CohortContext.Provider>
    )
}