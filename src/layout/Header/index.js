import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useCohort } from '../../contexts/cohort';
import * as FP from '../../_assets';
import './style.css'

export default function Header() {
    const { current, feature } = useCohort()
    const [ namesake, setNamesake ] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        current ? 
            setNamesake({
                ...current.namesake,
                imageUrl: `${FP.S3_COHORTS}/${current.name.toLowerCase()}/avatar.jpeg`
            }) 
            : setNamesake({ 
                name: 'What our clients say',
                imageUrl: `${FP.SHAPES}/star-coral-555.png`,
                materials: [
                    { type: 'video', url: 'f5RNSRC7NP4' }
                ]
            })
    }, [current])

    return (
        <header>
            {/* <a href={FP.WWW} target="_blank" rel="noopener">
                <img id="logo" src={FP.LOGO_WHITE} alt="futureproof logo" />
            </a> */}

            { namesake && (
                <img
                    id="namesake" src={namesake.imageUrl}
                    alt={namesake.name}
                    onError={e => e.target.src = FP.DEVICE}
                    onClick={() => navigate('/')}/>
                    // onClick={() => feature(namesake)}/>
            )}

        </header>
    )
}
