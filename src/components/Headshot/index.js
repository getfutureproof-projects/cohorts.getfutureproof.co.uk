import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { S3_PUBLIC, PLACEHOLDER } from '../../_assets';
import { Button, colors } from '@getfutureproof/fpsb'

export default function Headshot({ person, loadStudent }) {
    const { feature, current } = useCohort()
    const [ cohort, setCohort ] = useState("")
    const [ showModal, setShowModal ] = useState()
    
    useEffect(() => {
        let cohort = person.cohort || current.name
        let modal = person.cohort || current.showModal
        setCohort(cohort)
        setShowModal(modal)
    }, [person])

    const handleSelect = (e, toFeature) => {
        e.stopPropagation()
        loadStudent(toFeature)
    }

    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "") 

    const setClassNames = () => {
        let classNames = ["img_container"]
        showModal && classNames.push("active")
        return classNames.join(" ")
    }

    return (
        <div className={setClassNames()} onClick={showModal ? (e => handleSelect(e, person)) : undefined}>
                {/* { person.project ? 
                    <img className="project_logo"
                        src={`${S3_PUBLIC}/${cohort.toLowerCase()}/projectLogos/${person.project.name.replace(' ', '')}.png`}
                        alt={person.project.name}
                        onClick={e => handleSelect(e, person.project)}
                    /> : <div className="project_logo_placeholder"></div> } */}

                <img 
                    className="headshot"
                    src={`${S3_PUBLIC}/${cohort.toLowerCase()}/headshots/${normalise(person.name).replace(/\s/gu, '_')}.png`}
                    onError={e => e.target.src = PLACEHOLDER}
                    alt={person.name} 
                />
                <button className="select" style={{backgroundColor: colors.purple}}>{person.name}</button>

        </div>
    )
}
