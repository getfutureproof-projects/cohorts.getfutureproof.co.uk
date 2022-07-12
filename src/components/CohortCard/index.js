import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import * as FP from '../../_assets';
import { Heading, Card, colors, Frame } from '@getfutureproof/fpsb'
import { useLocation } from 'react-router-dom';

export default function CohortCard({ name, timeline, action }) {
    const { feature, current } = useCohort()
    const [cohort, setCohort] = useState("")
    const [showModal, setShowModal] = useState()
    const { pathname } = useLocation()


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
                { display: 'flex', flexWrap: 'wrap', maxWidth: '275px', justifyContent: 'center', height: '325px', padding: '10px 0 20px 0', whiteSpace: 'pre-line' }
            }
            color={randColor()}
        >
            <img
                style={{ objectFit: 'cover', height: '100px', width: '100px' }}
                className={`framed angles`}
                src={`${FP.S3_COHORTS}/${name.toLowerCase()}/avatar.jpeg`}
                onError={e => e.target.src = FP.DEVICE} />
                
            <span className='text-display large' style={{ textAlign: 'center', width: '100%' }}>{name}</span>
            <span className='regular tiny' style={{ textAlign: 'center', width: '100%', lineHeight: 1 }}>{timeline}</span>

            <button onClick={action} style={{ minHeight: 0 }} className="btn bg-purple text-white"> See cohort </button>
        </div>
    )
}
