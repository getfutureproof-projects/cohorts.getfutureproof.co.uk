import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { colors, Button, Card, Heading, Section } from '@getfutureproof/fpsb';
import './style.css'

import { S3_COHORTS } from '../../_assets';

const YOUTUBE = "https://www.youtube-nocookie.com/embed"
const YT_OPTS = "controls=1&autoplay=1"

export default function Modal() {
    const { featured, clearFeatured, current, feature } = useCohort()
    const [ media, setMedia ] = useState()
    const [ cohort, ] = useState(() => current ? current.name : featured.cohort)


    useEffect(() => {
        function selectInitMaterial(){
            if(featured.materials){
                let video = featured.materials.find(m => m.type === "video")
                let profile = featured.materials.find(m => m.type === "cv" || m.type === "profile")
                if(video) return `${YOUTUBE}/${video.url}?start=0&${YT_OPTS}`;
                if(profile) return `${S3_COHORTS}/${cohort.toLowerCase()}/${profile.type}s/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`;
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
                setMedia(`${S3_COHORTS}/${cohort.toLowerCase()}/cvs/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`);
                break;
            case "profile":
                setMedia(`${S3_COHORTS}/${cohort.toLowerCase()}/profiles/${normalise(featured.name).replace(/\s/gu, "_")}.pdf`);
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
        feature(student, current.name)
    }

    const renderMaterials = (opts = ['violet', 'lime', 'lemon', 'coral']) => (
        [ ...featured.materials, featured.github && { type: "github" }]
            .filter(x => !!x)
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((m, i)=> (
                <Card
                    key={i}
                    width={`calc(100%/${featured.materials.length + 3})`}
                    variant='info'
                    colorway={opts[i]}
                    clickable
                    inverted
                    onClick={(e) => handleSelectMedia(e, m)}
                    title={m.type === "cv" ? "Profile" : m.type[0].toUpperCase() + m.type.slice(1).toLowerCase()}

                >
                    {'\n'}
                </Card>
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
        <Button href={`https://github.com/${featured.github}`} target="_blank" rel="noreferrer" external colorway='lime' inverted label="Visit GitHub profile" />
        <img src={`https://github-readme-stats.vercel.app/api?username=${featured.github}&show_icons=true&locale=en`} alt="Github stats" />
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
                style={{
                    backgroundColor: colors.purple
                }}>
                <Section bgColor='purple'>
                {/* <h2 id='st-name'>{featured.name}</h2> */}
                <Heading color='white' size='h2' content={featured.name} />
                </Section>
                <div id="icons">
                    <span onClick={clearFeatured} style={{ cursor: "pointer" }}>✖</span>
                </div>

                {/* <Section> */}
                <section id="content">
                    { renderContent() }            
                </section>
                {/* </Section> */}

                {/* <section className="btn-group" id="modal-btns"> */}
                <Section direction='ltr' bgColor='purple'>
                    { featured.materials && renderMaterials() }
                    { featured.students && renderStudents() }
                </Section>
                {/* </section> */}

                
            </section>
        </div>
    )
}
