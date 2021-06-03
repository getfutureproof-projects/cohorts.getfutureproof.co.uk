import React, { useState, useEffect } from 'react'
import './style.css'

export default function Header({ roster }) {
    const [ namesake, setNamesake ] = useState({ name: 'futureproof Cohorts', imageUrl: 'https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/favicon.ico'})

    useEffect(() => {
        roster ? 
            setNamesake({ name: roster.namesake.name, imageUrl: roster.namesake.imageUrl }) 
            : setNamesake({ name: 'futureproof Cohorts', imageUrl: 'https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/favicon.ico'})
    }, [roster])

    return (
        <header>
            <img id="namesake" src={namesake.imageUrl} alt={namesake.name} />

            <a href="https://getfutureproof.co.uk" target="_blank" rel="noopener">
                <img id="logo" src="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/futureproof_logotype_250x60.png" alt="futureproof logo" />
            </a>
        </header>
    )
}
