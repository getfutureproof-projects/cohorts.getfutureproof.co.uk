import React from 'react'
import { useCohort } from '../../contexts/cohort'
import { Headshot, BackBtn } from '../'
import './style.css'

export default function HeadshotsIndex() {
    const { current } = useCohort()

    const renderHeadshots = current.students.map((s, i) => <Headshot key={i} person={s}/>)

    const renderSummary = () => {
        let summary;

        switch(current.status){
            case 'graduated':
                summary = `We graduated on ${current.endDate.format("MMMM Do YYYY")}!`
                break;
            case 'current':
                summary = "We're currently honing our skills on futureproof's 13 week course!"
                break;
            case 'preview':
                summary = `We recently started our course and are working hard honing our skills! Our profiles will be available from ${current.previewEndDate.format("MMMM Do")}!`
                break;
            case 'upcoming':
                summary = `We are excited to start our course on ${current.startDate.format("MMMM Do YYYY")}!`
                break;
        }

        summary += isLive() ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${current.previewEndDate.format("MMMM Do")}.`


        return summary
    }

    const isLive = () => current.status === 'graduated' || current.status === 'current'

    return (
        <section id="container">
            {/* { current && !current.status === 'preview' && */}
                <>
                <div id="summary_container">
                    <h2><BackBtn path="/" /> {
                        isLive() ? 
                            `Hello! We are the ${current.name} cohort.`
                            : `The ${current.name} cohort is coming soon!`
}                   </h2>
                    <p id="cohort-summary">{ renderSummary() }</p>
                </div>
                { isLive() && renderHeadshots }
                </>
            {/* } */}

            {/* { current && (current.status === 'preview' || current.status === 'upcoming') &&
                <div id="summary_container">
                    <h2><BackBtn path="/" />The {current.name} cohort is coming soon!</h2>
                    <p id="cohort-summary">{ renderSummary() }</p>
                </div>
            } */}
        </section>
    )
}
