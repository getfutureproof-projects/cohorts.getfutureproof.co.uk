import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import './style.css'

export default function Contact() {
    const [ subject, setSubject ] = useState("futureproof Associates")
    const cohort = useCohort()

    useEffect(() => {
        cohort.current ? 
            setSubject(`futureproof%3A%20${cohort.current.name}%20Cohort`) 
            : setSubject("futureproof%20Associates")
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
