import React, { useState, useEffect } from 'react';
import { useCohort } from '../../contexts/cohort';
import * as FP from '../../_assets';
import './style.css'

export default function Header() {
    const { current, feature } = useCohort()
    const [ namesake, setNamesake ] = useState()

    useEffect(() => {
        current ? 
            setNamesake({
                ...current.namesake,
                imageUrl: `${FP.S3_PUBLIC}/${current.name.toLowerCase()}/avatar.jpeg`
            }) 
            : setNamesake({ 
                name: 'What our clients say',
                imageUrl: FP.DEVICE,
                materials: [
                    { type: 'video', url: 'f5RNSRC7NP4' }
                ]
            })
    }, [current])

    return (
        <header>
            { namesake && <img id="namesake" src={namesake.imageUrl} alt={namesake.name} onClick={() => feature(namesake)}/> }

            <a href={FP.WWW} target="_blank" rel="noopener">
                <img id="logo" src={FP.LOGO} alt="futureproof logo" />
            </a>
        </header>
    )
}
