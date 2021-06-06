import React from 'react'
import { useCohort } from '../../contexts/cohort'
import { Headshot, BackBtn } from '../'
import './style.css'

export default function HeadshotsIndex() {
    const cohort = useCohort()

    const renderHeadshots = cohort.current.students.map((s, i) => <Headshot key={i} person={s}/>)

    return (
        <section id="container">
            <div id="summary_container">
                <h2><BackBtn /> Hello! We are the {cohort.current.name} cohort.</h2>
                <p>We're honing our skills on futureproof's 13 week course, click on our picture to find out more about us.</p>
            </div>
            { renderHeadshots }
        </section>
    )
}
