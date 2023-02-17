import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function ContactBtn({mini}) {
    const [ subject, setSubject ] = useState("futureproof Associates")
    const cohort = useCohort()
    const navigate = useNavigate()

    useEffect(() => {
        cohort.current ? 
            setSubject(`futureproof%3A%20${cohort.current.name}%20Cohort`) 
            : setSubject("futureproof%20Associates")
    }, [cohort])

    // const sendMail = () => navigate(`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`)

    return (
        <>
            <a
                id='contact-btn'
                className="contact bg-coral text-purple"
                href={`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`}
                // onClick={() => navigate('/contact')}
                >
                {mini ? "Speak to us" : "Get in touch with futureproof,\nwe can't wait to get started!"}
                <span>&#10230;</span>
            </a>
        </>
    )
}
