import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useNavigate } from 'react-router-dom'

export default function ContactBtn({mini}) {
    const [ subject, setSubject ] = useState("futureproof Associates")
    const cohort = useCohort()
    const navigate = useNavigate()

    useEffect(() => {
        cohort.current ? 
            setSubject(`futureproof%3A%20${cohort.current.name}%20Cohort`) 
            : setSubject("futureproof%20Associates")
    }, [cohort])

    const sendMail = () => navigate(`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`)

    return (
        <a
            className="btn contact bg-coral text-purple"
            href={`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`}
            // onClick={() => navigate('/contact')}
            style={{ width: 'fit-content' }}
        >
            {mini ? "Speak to us" : "Get in touch with futureproof,\nwe can't wait to get started!"}
        </a>
    )
    return (
        <Section direction='ttb' justifyContent='center'>
            {/* <a href={`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`}> */}
                {/* <button
                    style={{
                        backgroundColor: colors.coral,
                        color: colors.purple
                    }}
                >
                    {"Get in touch with futureproof,\nwe can't wait to get started!"}
                </button> */}
                <Button
                    colorway='coral'
                    color='coral'
                    shadow
                    width='70vw'
                    href={`mailto:krikor@getfutureproof.co.uk,claudia@getfutureproof.co.uk?subject=${subject}`}
                    // onClick={sendMail}
                    label={"Get in touch with futureproof,\nwe can't wait to get started!"}
                >
                    {/* <p>Get in touch with futureproof</p> */}
                    {/* <p>We can't wait to get started</p> */}
                </Button>
                <div style={{padding: '1em'}}></div>
            {/* </a> */}
        </Section>
    )
}
