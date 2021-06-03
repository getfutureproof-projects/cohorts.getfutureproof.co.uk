import React from 'react'
import { useCohort } from '../../contexts/cohort'

export default function Modal() {
    const cohort = useCohort()

    return (
        <div id="overlay">
            <section id="modal">
                <h1 id="st-name">Name</h1>
                <div id="icons">
                    <a id="pop-out" href="https://getfutureproof.co.uk" target="_blank" rel="noreferrer">Open in a new tab</a>
                </div>
                <section className="btn-group" id="materials">
                    <button id="st-video" className="linkout">Video</button>
                    <button id="st-cv" className="linkout">CV</button>
                    <button id="st-portfolio" className="linkout">Portfolio</button>
                </section>
            </section>
        </div>
    )
}
