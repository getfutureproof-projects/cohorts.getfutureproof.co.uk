import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import * as FP from '../../_assets';
import { Heading, Card, colors, Frame } from '@getfutureproof/fpsb'
import { useLocation } from 'react-router-dom';

export default function CohortCard({ name, timeline, action, frame, colour }) {
    const { feature, current } = useCohort()
    const [cohort, setCohort] = useState("")
    const [showModal, setShowModal] = useState()
    const { pathname } = useLocation()


    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "")

    return (

        <div
            className={`bg-${colour}`}
            style={
                { display: 'flex', flexWrap: 'wrap', maxWidth: '275px', justifyContent: 'center', height: '325px', padding: '10px 0 20px 0', whiteSpace: 'pre-line' }
            }
            color={colour}
        >
            <img
                style={{ objectFit: 'cover', height: '100px', width: '100px' }}
                className={`framed angles`}
                src={`${FP.S3_COHORTS}/${name.toLowerCase()}/avatar.jpeg`}
                alt={`Image representing ${name}`}
                onError={e => e.target.src = FP.DEVICE} />
                
            <span className='text-display large' style={{ textAlign: 'center', width: '100%' }}>{name}</span>
            <span className='regular tiny' style={{ textAlign: 'center', width: '100%', lineHeight: 1 }}>{timeline}</span>

            <button onClick={action} style={{ minHeight: 0 }} className="btn bg-purple text-white"> See cohort </button>
        </div>
    )
}
