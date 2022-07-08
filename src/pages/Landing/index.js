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
            {/* <Section justifyContent='center' bgColor='purple'>
                <Heading
                    size="huge"
                    color="white"
                    content="Meet the futureproof cohorts!" />
                    
                <Button
                    label="See all associates currently available for interviews"
                    onClick={() => navigate('/available')}
                    colorway='lemon'
                    inverted
                    shadow
                />
            </Section> */}

            <Section direction='ltr' justifyContent='center' bgColor='white'>
                <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1232px', justifyContent: 'center'}}>
                <Card
                    variant='info'
                    inverted
                    colorway='lime'
                    width='40%'
                    >
                    Here you can see all our cohorts and find associate profiles.
                </Card>
                
                <Card 
                    variant='info'
                    colorway='coral'
                    inverted
                    width='40%'
                    >
                    For more information on futureproof or any of our associates, contact us below.
                </Card>
                </div>
            </Section>

            <Section bgColor='lime' direction='ltr' justifyContent='center'>

            <CohortsIndex />
            </Section>
        </>
    )
}
