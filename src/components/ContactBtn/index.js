import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function ContactBtn({mini, inverted}) {
    const [ subject, setSubject ] = useState("La Fosse Academy Associates")
    const cohort = useCohort()
    const navigate = useNavigate()

    useEffect(() => {
        cohort.current ? 
            setSubject(`lafosseacademy%3A%20${cohort.current.name}%20Cohort`) 
            : setSubject("lafosseacademy%20Associates")
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
                {mini ? "Speak to us" : "Get in touch with La Fosse Academy,\nwe can't wait to get started!"}
                <span>&#10230;</span>
            </a>
        </>
    )
}
