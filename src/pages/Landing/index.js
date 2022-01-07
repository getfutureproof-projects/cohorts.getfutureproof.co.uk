import React from 'react'
import { useHistory } from 'react-router'
// import { CohortsIndex, Button } from '../../components'
import { CohortsIndex } from '../../components'
import { Button, Heading } from '@getfutureproof/fpsb'
import SEO from '../SEO'
import './style.css'

export default function Landing() {
    const history = useHistory()

    return (
        <>
            <SEO topic="index"/>
            {/* <h1 id="greeting" className="shimmer static">Welcome to futureproof!</h1> */}
            <Heading size="large" content="Welcome to futureproof!" />

            <Button
                label="See all associates currently available for interviews"
                onClick={() => history.push('/available')}
            />

            <div id="summary" className="italic">
                <p>Here you can see all our cohorts and find associate profiles.</p>
                <p>For more information on futureproof or any of our associates, contact us below.</p>
            </div>

            <CohortsIndex />
        </>
    )
}
