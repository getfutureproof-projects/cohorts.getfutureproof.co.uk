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
            let today = dayjs().add(2, 'weeks')
            const { data } = await axios.get('https://raw.githubusercontent.com/getfutureproof-admin/cohorts/main/db.json')
            let filtered = data.cohorts.filter(c => dayjs(c.startDate).isBefore(today.add(3, 'months')))
            let sorted = filtered.sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
            let cohorts = sorted.map(c => {
                let startDate = dayjs(c.startDate)
                let previewEndDate = dayjs(c.startDate).add(1, 'weeks')
                let endDate = dayjs(c.startDate).add(13, 'weeks').subtract(3, 'days')

                let status = 'preview'
                let isLive = false
                if (startDate.isAfter(today)){
                    status = 'upcoming'
                } else if (endDate.isBefore(today)) {
                    status = 'graduated'
                    isLive = true
                } else if (previewEndDate.isBefore(today)) {
                    status = 'current'
                    isLive = true
                }
                
                return { ...c, startDate, endDate, previewEndDate, status, isLive }
            })
            setList(cohorts)
        } catch (e) {
            setError("Oops! There's been a problem fetching our cohorts, please try again later!")
            console.error(e);
        }
    }

    const set = async (cohort) => {
        if(cohort){
            let dates = list.find(c => c.name.toLowerCase() === cohort.name.toLowerCase())
            setCurrent({ ...dates, ...cohort })
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