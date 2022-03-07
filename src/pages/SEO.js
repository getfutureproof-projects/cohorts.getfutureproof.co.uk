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
        let description = "Meet the tech superstars of the future!"
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
            <meta property="og:site_name" content={`futureproof ✱ ${data.title}`} />
            <title>{`futureproof ✱ ${data.title}`}</title>
            <meta name="description" content={data.description} />

            <meta property="twitter:description" content={data.description} />
            <meta property="twitter:title" content={`futureproof ✱ ${data.title}`} />

            <meta property="twitter:site" content="@get_futureproof" />
            <meta property="twitter:creator" content="@get_futureproof" />

            <meta
                property="og:image:width"
                content="250px"
            />
            <meta
                property="og:image:height"
                content="60px"
            />
            <meta
                property="og:image"
                content="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/brand-assets/logo_250x60.png"
            />
            <meta
                property="og:image:secure_url"
                content="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/brand-assets/logo_250x60.png"
            />

            <meta
                property="twitter:image"
                content="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/brand-assets/logo_250x60.png"
            />
            <meta
                property="twitter:image:alt"
                content="futureproof logo"
            />

        </Helmet>
    )
}
