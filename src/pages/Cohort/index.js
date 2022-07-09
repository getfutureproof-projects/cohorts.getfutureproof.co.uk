import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, HeadshotsIndex } from '../../components'
import { Section } from '@getfutureproof/fpsb'
import SEO from '../SEO'

export default function Cohort() {
    const { cohort } = useParams();
    const { list, set, current, loading, error, loadCohort } = useCohort();
    const [dError, setDError] = useState()

    useEffect(() => {
        loadCohort(cohort)

        return () => set(null)
    }, [list])

    useEffect(() => {
        setDError(error)
    }, [error])

    return (
        <>
        <SEO topic={current ? 'cohort' : 'index'}/>
        <Section direction='ltr'>
            { loading && <span className='medium text-display'>Loading cohort data...</span> }
            { dError && <span className='medium text-display'><BackBtn path="/" /> {dError}</span> }
            { current && <HeadshotsIndex />}
        </Section>
        </>
    )
}
