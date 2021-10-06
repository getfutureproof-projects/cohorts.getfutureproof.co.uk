import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

import { S3_PUBLIC } from '../../_assets';

const YOUTUBE = "https://www.youtube-nocookie.com/embed"
const YT_OPTS = "controls=1&autoplay=1"

export default function Modal() {
    const { clearFeatured, featured, current, feature } = useCohort()
    const [ media, setMedia ] = useState()

    
    useEffect(() => {
        function selectInitMaterial(){
            if(featured.materials){
                let video = featured.materials.find(m => m.type === "video")
                let cv = featured.materials.find(m => m.type === "cv")
                if(video) return `${YOUTUBE}/${video.url}?start=0&${YT_OPTS}`;
                if(cv) return `${S3_PUBLIC}/${current.name.toLowerCase()}/cvs/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`;
            } else if (current.projects) {
                return `${YOUTUBE}/${current.projects.videoId}?start=${featured.startPoint}&${YT_OPTS}`;
            }
            return "github"
        }
        let media = selectInitMaterial()
        setMedia(media)
    }, [ featured ])
    
    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    
    const handleSelectMedia = (e, m) => {
        e.stopPropagation()
        switch(m.type) {
            case "video": 
                setMedia(`${YOUTUBE}/${m.url}?start=0&${YT_OPTS}`);
                break;
            case "cv":
                setMedia(`${S3_PUBLIC}/${current.name.toLowerCase()}/cvs/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`);
                break;
            case "github":
                setMedia("github");
                break;
            default:
                setMedia(m.url)
        }
    }

    const handleSelectStudent = (e, st) => {
        e.stopPropagation()
        let student = current.students.find(s => s.name === st)
        feature(student)
    }

    const renderMaterials = () => (
        [ ... featured.materials, featured.github && { type: "github" }]
            .filter(x => !!x)
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((m, i)=> (
                <button key={i} id={`st-${m.type.toLowerCase()}`} className="linkout" onClick={(e) => handleSelectMedia(e, m)}>
                    {m.type[0].toUpperCase() + m.type.slice(1).toLowerCase()}
                </button>
            ))
    )

    const renderContent = () => {
        if (media ==="github") return renderGitHubStats()
        return renderIframe()
        
    }

    const renderIframe = () => (
        <iframe
            src={media}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">    
        </iframe>)
    
    const renderGitHubStats = () => (<div id="github-stats">
        <a href={`https://github.com/${featured.github}`} target="_blank" rel="noreferrer">Visit GitHub profile <span>➭</span></a>
        <img src={`https://github-readme-stats.vercel.app/api?username=${featured.github}&show_icons=true&locale=en`} alt="Github stats" />
    </div>)

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
                    { media !=="github" && 
                        <a id="pop-out" href={media} target="_blank" rel="noreferrer">Open in a new tab ➭</a> }
                </div>

                <section className="btn-group" id="modal-btns">
                    { featured.materials && renderMaterials() }
                    { featured.students && renderStudents() }
                </section>

                <section id="content">
                    { renderContent() }            
                </section>
            </section>
        </div>
    )
}
