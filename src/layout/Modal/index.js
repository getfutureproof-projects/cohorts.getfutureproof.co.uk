import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { Heading } from '@getfutureproof/fpsb';
import { useWindowSize } from '../../hooks/windowSize';
import './style.css'

import { S3_COHORTS } from '../../_assets';

const YOUTUBE = "https://www.youtube-nocookie.com/embed"
const YT_OPTS = "controls=1&autoplay=1"

export default function Modal() {
    const { featured, clearFeatured, current, feature } = useCohort()
    const [ media, setMedia ] = useState({ type: '', content: ''})
    const [ cohort, ] = useState(() => current ? current.name : featured.cohort)
    const screen = useWindowSize()


    useEffect(() => {
        function selectInitMaterial(){
            if(featured.materials){
                let video = featured.materials.find(m => m.type === "video")
                let profile = featured.materials.find(m => m.type === "cv" || m.type === "profile")
                if(video) {
                    if (video.hasOwnProperty("url") && !video.hasOwnProperty("id")){
                        video.id = video.url;
                    }
                    return { type: 'video', content: `${YOUTUBE}/${video.id}?start=0&${YT_OPTS}` };
                };
                if(profile) return { type: 'profile', content: `${S3_COHORTS}/${cohort.toLowerCase()}/${profile.type}s/${normalise(featured.name).replace(/\s/gu, "_")}.pdf` };
            } else if (current.projects) {
                return { type: 'video', content: `${YOUTUBE}/${current.projects.videoId}?start=${featured.startPoint}&${YT_OPTS}`};
            }
            return {type: "github", content: "github" }
        }
        let media = selectInitMaterial()
        setMedia(media)
    }, [ featured ])
    
    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    
    const handleSelectMedia = (e, m) => {
        e.stopPropagation()
        let content
        switch(m.type) {
            case "video":
                if (m.hasOwnProperty("url") && !m.hasOwnProperty("id")) {
                    m.id = m.url;
                }
                content = `${YOUTUBE}/${m.id}?start=0&${YT_OPTS}`;
                break;
            case "cv":
                content = `${S3_COHORTS}/${cohort.toLowerCase()}/cvs/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`;
                break;
            case "profile":
                content = `${S3_COHORTS}/${cohort.toLowerCase()}/profiles/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`;
                break;
            case "github":
                content = "github"
                break;
            default:
                content = m.url
                break;
            }
        setMedia({ type: m.type, content })
    }

    const handleSelectStudent = (e, st) => {
        e.stopPropagation()
        let student = current.students.find(s => s.name === st)
        feature(student, current.name)
    }

    const renderMaterials = (opts = ['violet', 'lime', 'lemon', 'coral']) => (
        [ ...featured.materials, featured.github && { type: "github" }]
            .filter(x => !!x)
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((m, i)=> (
                <div 
                    className="modal-btn card bg-purple" 
                    onClick={(e) => handleSelectMedia(e, m)}
                    style={{width: `calc(100%/${featured.materials.length + 3})`, margin: 0, cursor: 'pointer'}}
                    >
                    <div className={`title bg-purple`} style={{border: 'none'}}>
                        {m.type === "cv" ? "Profile" : m.type[0].toUpperCase() + m.type.slice(1).toLowerCase()}
                    </div>
                    <div className={`content bg-${media && (media.type === m.type) ? 'lime' : 'violet'}`}>
                        {'\n'}
                    </div>
                </div>
            ))
    )

    const renderContent = () => {
        if (media.type ==="github") return renderGitHubStats()
        return renderIframe()
        
    }

    const renderIframe = () => (
        <iframe
            src={media.content}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">    
        </iframe>)
    
    const renderGitHubStats = () => (<div id="github-stats">
        <a className='btn bg-lemon' href={`https://github.com/${featured.github}`} target="_blank" rel="noreferrer">Visit GitHub profile</a>
        <img src={`https://github-readme-stats.vercel.app/api?username=${featured.github}&show_icons=true&locale=en`} alt="Github stats" style={{maxWidth: '80vw'}}/>
    </div>)

    const renderStudents = () => featured.students.map((s, i)=> (
        <button key={i} className="linkout" onClick={(e) => handleSelectStudent(e, s)}>
            {s}
        </button>
    ))

    return (
        <div id="overlay" onClick={clearFeatured}>
            <section
                id="modal" 
                className='bg-purple'
                >
                <div>
                    <div style={{paddingTop: '10px'}}>
                        <Heading color='white' size={screen.portrait ? 'h3' : 'h2'} content={featured.name} />
                    </div>
                    <div id="icons">
                        <span onClick={clearFeatured} style={{ cursor: "pointer" }}>✖</span>
                    </div>
                </div>

                <section id="content">
                    { renderContent() }            
                </section>

                <section className="btn-group" id="modal-btns">
                    { featured.materials && renderMaterials() }
                    { featured.students && renderStudents() }
                </section>

            </section>
        </div>
    )
}
