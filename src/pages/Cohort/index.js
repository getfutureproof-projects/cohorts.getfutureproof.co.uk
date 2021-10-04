import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, HeadshotsIndex } from '../../components'
import SEO from '../SEO'

export default function Cohort() {
    const { cohortName } = useParams()
    const { list, set, current, loading, error, loadCohort } = useCohort()

    useEffect(() => {
        loadCohort(cohortName)

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
