import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Header() {
    const { current, feature } = useCohort()

    const [ namesake, setNamesake ] = useState()

    useEffect(() => {
        current ? 
            setNamesake(current.namesake) 
            : setNamesake({ 
                name: 'futureproof',
                imageUrl: 'https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/favicon.ico',
                materials: [
                    { type: 'video', url: 'https://youtu.be/ZseHn7q0_DM' }
                ]
            })
    }, [current])

    return (
        <header>
            { namesake && <img id="namesake" src={namesake.imageUrl} alt={namesake.name} onClick={() => feature(namesake)}/> }

            <a href="https://getfutureproof.co.uk" target="_blank" rel="noopener">
                <img id="logo" src="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/futureproof_logotype_250x60.png" alt="futureproof logo" />
            </a>
        </header>
    )
}
