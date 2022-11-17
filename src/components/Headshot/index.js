import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { S3_COHORTS, PLACEHOLDER } from '../../_assets';

export default function Headshot({ person, loadStudent, seeMore, frame, colour }) {
    const { current } = useCohort()
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



    return (

        <div
            className={`bg-${colour}`}
            style={
                { display: 'flex', flexWrap: 'wrap', maxWidth: '275px', justifyContent: 'center', height: '325px', padding: '10px 0 20px 0' }
            }
            color={colour}
        >
            <img
                width='200px'
                style={{ objectFit: 'cover' }}
                className={`framed ${frame}`} src={`${S3_COHORTS}/${cohort.toLowerCase()}/headshots/${normalise(person.name).replace(/\s/gu, '_')}.png`}
                alt={`${person.name}`}></img>
            <span style={{ textAlign: 'center', width: '100%', padding: '5px 0' }}>{person.name}</span>

            {seeMore && <button className="btn bg-purple text-white" onClick={showModal ? (e => handleSelect(e, person)) : undefined}> See more </button>}
        </div>
    )
}
