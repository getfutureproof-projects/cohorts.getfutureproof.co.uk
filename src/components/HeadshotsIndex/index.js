import React from 'react'
import { useCohort } from '../../contexts/cohort'
import { Headshot, BackBtn } from '../'
import './style.css'

export default function HeadshotsIndex() {
    const { current } = useCohort()

    const renderHeadshots = current.students.map((s, i) => <Headshot key={i} person={s}/>)

    const renderSummary = () => {
        let status = current.status === 'graduated' ? 
                `We graduated from futureproof's 13 week course on ${current.endDate.format("MMMM Do YYYY")}!`
                : "We're currently honing our skills on futureproof's 13 week course!"
        return status + '\nClick on our picture to find out more about us.'
    }

    return (
        <section id="container">
            { current && 
                <>
                <div id="summary_container">
                    <h2><BackBtn /> Hello! We are the {current.name} cohort.</h2>
                    <p id="cohort-summary">{ renderSummary() }</p>
                </div>
                { renderHeadshots }
                </>
            }
        </section>
    )
}
