import React from 'react'
import { useHistory } from 'react-router'
// import { CohortsIndex, Button } from '../../components'
import { CohortsIndex } from '../../components'
import { Button, Heading } from '@getfutureproof/fpsb'
import { Card } from '../../forsb/Card'
import SEO from '../SEO'
import './style.css'
import { Section } from '../../forsb/Section'

export default function Landing() {
    const history = useHistory()

    return (
        <>
            <SEO topic="index"/>
            {/* <h1 id="greeting" className="shimmer static">Welcome to futureproof!</h1> */}
            <Heading
                size="xlarge"
                content="Meet the futureproof cohorts!" />
                
            <Button
                label="See all associates currently available for interviews"
                onClick={() => history.push('/available')}
                style={{ margin: '0 auto' }}
            />

            <Section>
                <Card 
                    variant='info'
                    shadow
                    inverted
                    colorway='lemon'
                    maxWidth='30%'
                >
                    Here you can see all our cohorts and find associate profiles.
                </Card>
                
                <Card 
                    variant='info'
                    shadow
                    colorway='coral'
                    inverted
                    maxWidth='30%'
                >
                    For more information on futureproof or any of our associates, contact us below.
                </Card>
            </Section>

            {/* <div id="summary" className="italic">
                <p>Here you can see all our cohorts and find associate profiles.</p>
                <p>For more information on futureproof or any of our associates, contact us below.</p>
            </div> */}

            <CohortsIndex />
        </>
    )
}
