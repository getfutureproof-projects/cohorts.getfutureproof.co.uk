import React from 'react'
import { CohortsIndex } from '../../components'
import { Section } from '@getfutureproof/fpsb'
import SEO from '../SEO'
import './style.css'

export default function Landing() {

    return (
        <>
            <SEO topic="index" />

            <Section direction='ltr' justifyContent='center'>
                <CohortsIndex />
            </Section>
        </>
    )
}
