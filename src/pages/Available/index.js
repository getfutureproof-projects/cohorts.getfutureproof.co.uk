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
            { loading && <span className='medium text-display'>Finding futureproofers available for consultation...</span> }
            { error && <span className='medium text-display'><BackBtn path="/" /> {error}</span> }
            { available && <HeadshotsIndex showAvailable /> }
        </Section>
        </>
    )
}
