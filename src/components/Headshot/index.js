import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { S3_COHORTS, PLACEHOLDER } from '../../_assets';
import { Card, colors, Frame } from '@getfutureproof/fpsb'

export default function Headshot({ person, loadStudent, idx }) {
    const { feature, current } = useCohort()
    const [cohort, setCohort] = useState("")
    const [showModal, setShowModal] = useState()

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

    const randFrame = () => {
        let frames = ['angles', 'cog', 'star', 'shield'];
        let rand = Math.floor(Math.random() * frames.length);
        return frames[rand];
    }

    return (

        <div
            className={`bg-${randColor()}`}
            style={
                { display: 'flex', flexWrap: 'wrap', maxWidth: '275px', justifyContent: 'center', height: '325px', padding: '10px 0 20px 0' }
            }
            color={randColor()}
        >
            <img
                width='200px'
                className={`framed ${randFrame()}`} src={`${S3_COHORTS}/${cohort.toLowerCase()}/headshots/${normalise(person.name).replace(/\s/gu, '_')}.png`}></img>
            <span style={{ textAlign: 'center', width: '100%', padding: '5px 0' }}>{person.name}</span>
            <button className="btn bg-purple text-white" onClick={showModal ? (e => handleSelect(e, person)) : undefined}> See more </button>
        </div>
    )
}

    // <div className={setClassNames()} onClick={showModal ? (e => handleSelect(e, person)) : undefined}>
    //         <button className="select" style={{backgroundColor: colors.purple}}>{person.name}</button>

    // </div>
