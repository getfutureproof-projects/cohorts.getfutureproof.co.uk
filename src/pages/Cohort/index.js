import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, HeadshotsIndex } from '../../components'
import SEO from '../SEO'
import axios from 'axios'

export default function Cohort() {
    const { cohortName } = useParams()
    const { list, set, current } = useCohort()
    const [ loading, setLoading ] = useState()
    const [ error, setError ] = useState()

    useEffect(() => {
        async function fetchCohort(){
            if(list){
                try {
                    setLoading(true)
                    set(null)
                    let { data } = await axios.get(`https://raw.githubusercontent.com/getfutureproof/fp_study_notes_hello_github/main/${cohortName.toLowerCase()}/roster.json`)
                    if(data.projects){
                        for(let student of data.students) {
                            let project = data.projects[student.project]
                            student.project = project
                        }
                    }
                    set({
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
        }

        fetchCohort()

        return () => set(null)
    }, [cohortName, list])

    return (
        <>
        <SEO topic={current ? 'cohort' : 'index'}/>
        <article id="headshots">
            { loading && <h2>Loading cohort data...</h2> }
            { error && <h2><BackBtn path="/" /> {error}</h2> }
            { current && <HeadshotsIndex />}
        </article>
        </>
    )
}
