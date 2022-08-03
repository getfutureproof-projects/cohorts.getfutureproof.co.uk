import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useNavigate } from 'react-router-dom'

export default function ContactBtn({mini, inverted}) {
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
        <a
            // className={`btn contact bg-coral text-purple`}
      
            // className={`btn contact bg-${inverted ? 'purple' : 'coral'} text-${inverted ? 'white' : 'purple'}`}
            className={`btn contact ${inverted ? 'inverted' : 'standard'}`}
            href={`mailto:hello@getfutureproof.co.uk?subject=${subject}`}
            // onClick={() => navigate('/contact')}
            style={{ 
                width: 'fit-content',
            }}
        >
            {mini ? "Speak to us" : "Get in touch with futureproof,\nwe can't wait to get started!"}
        </a>
    )
}
