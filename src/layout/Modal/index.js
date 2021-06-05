import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Modal() {
    const { clearFeatured, featured } = useCohort()
    const [ media, setMedia ] = useState()

    useEffect(() => {
        if(featured.materials){
            let video = featured.materials.find(m => m.type === "video")
            video && setMedia(`https://www.youtube-nocookie.com/embed/${video.url}?start=0&controls=1&autoplay=1`)
        }
    }, [ featured ])

    const handleSelectMedia = (e, m) => {
        e.stopPropagation()
        if ( m.type === 'video'){
            setMedia(`https://www.youtube-nocookie.com/embed/${m.url}?start=0&controls=1&autoplay=1`)
        } else {
            setMedia(m.url)
        }
    }

    const renderMaterials = () => featured.materials.map((m, i)=> (
        <button key={i} id={`st-${m.type.toLowerCase()}`} className="linkout" onClick={(e) => handleSelectMedia(e, m)}>
            {m.type[0].toUpperCase() + m.type.slice(1).toLowerCase()}
        </button>
    ))

    return (
        <div id="overlay" onClick={clearFeatured}>
            <section id="modal">
                <h1 id="st-name">{featured.name}</h1>
                <div id="icons">
                    <span onClick={clearFeatured} style={{ cursor: "pointer" }}>✖</span>
                    <a id="pop-out" href="https://getfutureproof.co.uk" target="_blank" rel="noreferrer">Open in a new tab ➭</a>
                </div>

                <section className="btn-group" id="materials">
                    { featured.materials && featured.materials.length > 1 && renderMaterials() }
                </section>

                <section id="content">
                    <iframe
                        src={media}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">    
                    </iframe>
                    
                </section>
            </section>
        </div>
    )
}
