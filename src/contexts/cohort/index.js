import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const CohortContext = React.createContext();

export function useCohort(){
    return useContext(CohortContext)
}

export function CohortProvider({ children }){
    const [ list, setList ] = useState();
    const [ current, setCurrent ] = useState();
    const [ featured, setFeatured ] = useState();
    const [ error, setError ] = useState();

    useEffect(() => {
        fetchCohorts()
    }, [])

    async function fetchCohorts(){
        try {
            const { data } = await axios.get('https://raw.githubusercontent.com/getfutureproof-admin/cohorts/main/db.json')
            let sorted = data.cohorts.sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
            let cohorts = sorted.map(c => {
                let startDate = dayjs(c.startDate)
                let endDate = dayjs(c.startDate).add(13, 'weeks')
                let status = endDate.isAfter(dayjs()) ? 'current' : 'graduated'
                return { ...c, startDate, endDate, status }
            })
            setList(cohorts)
        } catch (e) {
            setError("Oops! There's been a problem fetching our cohorts, please try again later!")
            console.error(e);
        }
    }

    const set = async (cohort) => {
        if(cohort){
            let startDate = list.find(c => c.name === cohort.name)
            setCurrent({ ...cohort, startDate })
        } else {
            setCurrent(null)
        }
    };

    const feature = (feature) => setFeatured(feature)

    const clearFeatured = () => setFeatured(null)

    return (
        <CohortContext.Provider value={{ set, current, feature, featured, clearFeatured, list, error }}>
            { children }
        </CohortContext.Provider>
    )
}