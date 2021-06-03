import React, { useState, useEffect } from 'react'

export default function Contact({ cohort }) {
    const [ subject, setSubject ] = useState("futureproof Associates")

    useEffect(() => {
        cohort ? 
            setSubject(`futureproof%3A%20${cohort.name}%20Cohort`) 
            : setSubject("futureproof Associates")
    }, [cohort])

    return (
        <section id="contact">
            <a href={`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?cc=marcus@getfutureproof.co.uk,ella@getfutureproof.co.uk&subject=${subject}`}>
                <button>
                    Get in touch with futureproof, we can't wait to get started!
                </button>
            </a>
        </section>
    )
}
