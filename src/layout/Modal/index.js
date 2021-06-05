import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Modal() {
    const { clearFeatured, featured, current, feature } = useCohort()
    const [ media, setMedia ] = useState()

    useEffect(() => {
        if(featured.materials){
            let video = featured.materials.find(m => m.type === "video")
            video && setMedia(`https://www.youtube-nocookie.com/embed/${video.url}?start=0&controls=1&autoplay=1`)
        } else if (current.projects) {
            setMedia(`https://www.youtube-nocookie.com/embed/${current.projects.videoId}?start=${featured.startPoint}&controls=1&autoplay=1`)
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

    const handleSelectStudent = (e, st) => {
        e.stopPropagation()
        let student = current.students.find(s => s.name === st)
        feature(student)
    }

    const renderMaterials = () => featured.materials.filter(m => m.url).map((m, i)=> (
        <button key={i} id={`st-${m.type.toLowerCase()}`} className="linkout" onClick={(e) => handleSelectMedia(e, m)}>
            {m.type[0].toUpperCase() + m.type.slice(1).toLowerCase()}
        </button>
    ))

    const renderStudents = () => featured.students.map((s, i)=> (
        <button key={i} className="linkout" onClick={(e) => handleSelectStudent(e, s)}>
            {s}
        </button>
    ))

    return (
        <div id="overlay" onClick={clearFeatured}>
            <section id="modal">
                <h1 id="st-name">{featured.name}</h1>
                <div id="icons">
                    <span onClick={clearFeatured} style={{ cursor: "pointer" }}>✖</span>
                    <a id="pop-out" href={media} target="_blank" rel="noreferrer">Open in a new tab ➭</a>
                </div>

                <section className="btn-group" id="materials">
                    { featured.materials && featured.materials.length > 1 && renderMaterials() }
                    { featured.students && renderStudents() }
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
