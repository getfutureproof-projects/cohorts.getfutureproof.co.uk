import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { S3_PUBLIC, PLACEHOLDER } from '../../_assets';
import { Card, colors } from '@getfutureproof/fpsb'

export default function Headshot({ person, loadStudent, idx }) {
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

    const randColor = () => {
        let opts = ['coral', 'lime', 'lemon', 'violet'];
        let rand = Math.floor(Math.random() * opts.length);
        return opts[rand];
    }

    return (
        <Card
            hoverEffect={showModal}
            onClick={showModal ? (e => handleSelect(e, person)) : undefined}
            variant='image'
            width='200px'
            colorway={randColor()}
            accent={randColor()}
            inverted={Math.random() < 0.5}
            title={person.name}
            image={`${S3_PUBLIC}/${cohort.toLowerCase()}/headshots/${normalise(person.name).replace(/\s/gu, '_')}.png`}
        >
        </Card>
        )
    }
    
    // <div className={setClassNames()} onClick={showModal ? (e => handleSelect(e, person)) : undefined}>
    //         <button className="select" style={{backgroundColor: colors.purple}}>{person.name}</button>

    // </div>