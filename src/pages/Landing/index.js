import React from 'react'
import { useHistory } from 'react-router'
import { CohortsIndex, Button } from '../../components'
import SEO from '../SEO'
import './style.css'

export default function Landing() {
    const history = useHistory()

    return (
        <>
            <SEO topic="index"/>
            <h1 id="greeting" className="shimmer static">Welcome to futureproof!</h1>

            <Button
                text="See all associates currently available for interviews"
                action={() => history.push('/available')}
            />

            <div id="summary" className="italic">
                <p>Here you can see all our cohorts and find associate CVs, video introductions and portfolio links.</p>
                <p>For more information on futureproof or any of our associates, contact us below.</p>
            </div>

            <CohortsIndex />
        </>
    )
}
