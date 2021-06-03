import React from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Modal() {
    const { clearFeatured, featured } = useCohort()

    return (
        <div id="overlay" onClick={clearFeatured}>
            <section id="modal">
                <h1 id="st-name">{featured.name}</h1>
                <div id="icons">
                    <a id="pop-out" href="https://getfutureproof.co.uk" target="_blank" rel="noreferrer">Open in a new tab</a>
                </div>

                <section className="btn-group" id="materials">
                    <button id="st-video" className="linkout">Video</button>
                    <button id="st-cv" className="linkout">CV</button>
                    <button id="st-portfolio" className="linkout">Portfolio</button>
                </section>

                <section id="content">
                    <iframe src="" frameborder="0"></iframe>
                </section>
            </section>
        </div>
    )
}
