import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, HeadshotsIndex } from '../../components'
import { Section } from '@getfutureproof/fpsb'
import SEO from '../SEO'

export default function Cohort() {
    const { cohort } = useParams();
    const { list, set, current, loading, error, loadCohort } = useCohort();

    useEffect(() => {
        loadCohort(cohort)

        return () => set(null)
    }, [list])

    return (
        <>
        <SEO topic={current ? 'cohort' : 'index'}/>
        <Section direction='ltr'>
            { loading && <h2>Loading cohort data...</h2> }
            { error && <h2><BackBtn path="/" /> {error}</h2> }
            { current && <HeadshotsIndex />}
        </Section>
        </>
    )
}
