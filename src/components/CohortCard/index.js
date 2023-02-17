import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import * as FP from '../../_assets';
import { Heading, Card, colors, Frame } from '@getfutureproof/fpsb'
import { useLocation } from 'react-router-dom';
import './style.css'

export default function CohortCard({ name, timeline, action, colour }) {
    // const { feature, current } = useCohort()
    // const [cohort, setCohort] = useState("")
    // const [showModal, setShowModal] = useState()
    // const { pathname } = useLocation()


    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return (

        <div
            id='cohort-box'
            className={`bg-${colour}`}
            color={colour}
        >
            <img
                style={{ objectFit: 'cover', height: '100px', width: '100px' }}
                className={`framed angles`}
                src={`${FP.S3_COHORTS}/${name.toLowerCase()}/avatar.jpeg`}
                onError={e => e.target.src = FP.DEVICE} />
                
            <span className='cohort-name large' style={{ textAlign: 'center', width: '100%' }}>{name}</span>
            <span className='regular tiny' style={{ textAlign: 'center', width: '100%', lineHeight: 1 }}>{timeline}</span>

            <button onClick={action} style={{ minHeight: 0 }} className="see-cohort bg-purple text-white"> See cohort <span>&#10230;</span> </button>
        </div>
    )
}
