import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'
import axios from 'axios';

export default function Cohort() {
    const { cohortName } = useParams()
    const cohort = useCohort()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    useEffect(() => {
        async function fetchCohort(){
            try {
                setLoading(true)
                let { data } = await axios.get(`https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohortName.toLowerCase()}/roster.json`)
                cohort.set({
                    name: cohortName[0].toUpperCase() + cohortName.slice(1).toLowerCase(),
                    ...data
                })
                setLoading(false)
            } catch (e) {
                setLoading(false)
                setError(`Oops, we can't find a cohort called ${cohortName[0].toUpperCase() + cohortName.slice(1).toLowerCase()}!`)
                console.error(e);
            }
        }

        fetchCohort()
    }, [cohortName])

    return (
        <section id="headshots">
            { loading && <h2>Loading cohort data...</h2> }
            { error && <h2>{error}</h2> }
            { cohort.current && <h2>Hello! We are the {cohort.current.name} cohort.</h2> }
        </section>
    )
}
