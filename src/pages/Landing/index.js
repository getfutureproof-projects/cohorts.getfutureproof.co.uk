import React from 'react'
import { useNavigate } from 'react-router'
import { CohortsIndex } from '../../components'
import { Button, Heading, Section, Card } from '@getfutureproof/fpsb'
import SEO from '../SEO'
import './style.css'

export default function Landing() {
    const navigate = useNavigate()

    return (
        <>
            <SEO topic="index"/>
            {/* <h1 id="greeting" className="shimmer static">Welcome to futureproof!</h1> */}
            <Section justifyContent='center'>
                <Heading
                    size="xlarge"
                    content="Meet the futureproof cohorts!" />
                    
                <Button
                    label="See all associates currently available for interviews"
                    onClick={() => navigate('/available')}
                    colorway='lemon'
                    inverted
                    shadow
                />
</Section>
                <Section direction='ltr' justifyContent='center'>
                <Card
                    variant='info'
                    inverted
                    colorway='lime'
                    width='200px'
                    >
                    Here you can see all our cohorts and find associate profiles.
                </Card>
                
                <Card 
                    variant='info'
                    colorway='coral'
                    inverted
                    width='200px'
                    >
                    For more information on futureproof or any of our associates, contact us below.
                </Card>
            </Section>

            <Section bgColor='purple' direction='ltr' justifyContent='center'>

            {/* <div id="summary" className="italic">
                <p>Here you can see all our cohorts and find associate profiles.</p>
                <p>For more information on futureproof or any of our associates, contact us below.</p>
            </div> */}

            <CohortsIndex />
            </Section>
        </>
    )
}
