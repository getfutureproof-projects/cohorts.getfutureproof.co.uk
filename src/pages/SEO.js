import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCohort } from '../contexts/cohort';

export default function SEO({topic}) {
    const [ data, setData ] = useState({
        title: "Cohorts",
        description: "Showcasing the work of futureproof's cohorts"
    })
    const { current } = useCohort()

    useEffect(() => {
        let title;
        let description = "Showcasing the work of futureproof's cohorts"
        switch (topic) {
            case 'cohort':
                title = current.name
                description = `Showcasing the futureproof ${current.name} cohort`; break;
            case 'error':
                title = 'Oops!'; break;
            case 'available':
                title = 'Available';
                description = `These futureproofers are ready to interview now!`; break;
            default:;
                title = 'Cohorts'; break;
        }
        setData({title, description})
    }, [topic]);

    return (
        <Helmet>
            <meta property="og:site_name" content={`futureproof ∞ ${data.title}`} />
            <title>{`futureproof ∞ ${data.title}`}</title>
            <meta name="description" content={data.description} />

            <meta property="twitter:description" content={data.description} />
            <meta property="twitter:title" content={`futureproof ∞ ${data.title}`} />
        </Helmet>
    )
}
