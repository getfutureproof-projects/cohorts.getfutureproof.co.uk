import React, { useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, HeadshotsIndex } from '../../components'
import { Section } from '@getfutureproof/fpsb'
import SEO from '../SEO'

export function Available() {
    const { loading, error, available, loadAvailable, list } = useCohort()

    useEffect(() => {
        loadAvailable()
    }, [list])

    return (
        <>
        <SEO topic="available"/>
        <Section direction='ltr'>
            { loading && <h2>Finding futureproofers available for consultation...</h2> }
            { error && <h2><BackBtn path="/" /> {error}</h2> }
            { available && <HeadshotsIndex showAvailable /> }
        </Section>
        </>
    )
}
