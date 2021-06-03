import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Cohort() {
    const { cohort } = useParams()
    const [ loading, setLoading ] = useState()
    const [ cohortData, setCohortData ] = useState()
    const [ error, setError ] = useState()

    useEffect(() => {
        async function fetchCohort(){
            try {
                setLoading(true)
                let { data } = await axios.get(`https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohort.toLowerCase()}/roster.json`)
                setCohortData({
                    name: cohort[0].toUpperCase() + cohort.slice(1).toLowerCase(),
                    ...data
                })
                setLoading(false)
            } catch (e) {
                setLoading(false)
                setError(`Oops, we can't find a cohort called ${cohort[0].toUpperCase() + cohort.slice(1).toLowerCase()}!`)
                console.error(e);
            }
        }

        fetchCohort()
    }, [cohort])

    return (
        <section id="headshots">
            { loading && <h2>Loading cohort data...</h2> }
            { error && <h2>{error}</h2> }
            { cohortData && <h2>Hello! We are the {cohortData.name} cohort.</h2> }
        </section>
    )
}
