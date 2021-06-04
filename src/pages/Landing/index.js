import React from 'react'
import { CohortsIndex } from '../../components'

export default function Landing() {
    return (
        <div>
            <h2>Welcome to futureproof!</h2>
            <p>Here you can see all our cohorts and find associate CVs, video introductions and portfolio links.</p>
            <p>For more info on futureproof or any of our associates, contact us below.</p>

            <CohortsIndex />
        </div>
    )
}
