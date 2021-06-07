import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCohort } from '../contexts/cohort';

export default function SEO() {
    const [ title, setTitle ] = useState()
    const cohort = useCohort()

    useEffect(() => {
        let title = cohort.current ? cohort.current.name : 'Cohorts'
        setTitle(title)
    }, [cohort]);

    return (
        <Helmet>
            <meta property="og:site_name" content={`futureproof ∞ ${title}`} />
            <title>{`futureproof ∞ ${title}`}</title>
            <meta name="description" content={`Showcasing the futureproof ${title} cohort`} />

            <meta property="twitter:description" content={`Showcasing the futureproof ${title} cohort`} />
            <meta property="twitter:title" content={`futureproof ∞ ${title}`} />
        </Helmet>
    )
}
