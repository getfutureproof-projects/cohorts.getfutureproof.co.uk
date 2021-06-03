import React, { useState, useContext } from 'react';

const CohortContext = React.createContext();

export function useCohort(){
    return useContext(CohortContext)
}

export function CohortProvider({ children }){
    const [ current, setCurrent ] = useState();
    const [ featured, setFeatured ] = useState();

    const set = (cohort) => setCurrent(cohort);

    const feature = (feature) => setFeatured(feature)

    const clearFeatured = () => setFeatured(null)

    return (
        <CohortContext.Provider value={{ set, current, feature, featured, clearFeatured }}>
            { children }
        </CohortContext.Provider>
    )
}