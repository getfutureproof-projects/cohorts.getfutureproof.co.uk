import React from 'react'
import { CohortsIndex } from '../../components'
import './style.css'

export default function Landing() {
    return (
        <>
            <h1 id="greeting">Welcome to futureproof!</h1>
            <div id="summary">
                <p>Here you can see all our cohorts and find associate CVs, video introductions and portfolio links.</p>
                <p>For more info on futureproof or any of our associates, contact us below.</p>
            </div>

            <CohortsIndex />
        </>
    )
}
