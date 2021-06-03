import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Header() {
    const cohort = useCohort()

    const [ namesake, setNamesake ] = useState()

    useEffect(() => {
        cohort.current ? 
            setNamesake(cohort.current.namesake) 
            : setNamesake({ name: 'futureproof Cohorts', imageUrl: 'https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/favicon.ico'})
    }, [cohort])

    return (
        <header>
            { namesake && <img id="namesake" src={namesake.imageUrl} alt={namesake.name} /> }

            <a href="https://getfutureproof.co.uk" target="_blank" rel="noopener">
                <img id="logo" src="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/futureproof_logotype_250x60.png" alt="futureproof logo" />
            </a>
        </header>
    )
}
