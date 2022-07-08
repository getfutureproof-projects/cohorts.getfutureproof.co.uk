import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router'
import { useCohort } from '../../contexts/cohort';
import { Heading, Button } from '@getfutureproof/fpsb'
import * as FP from '../../_assets';
import './style.css'
import ContactBtn from '../../components/ContactBtn';

export default function Header() {
    const { current, available, loading, error } = useCohort()
    const [namesake, setNamesake] = useState()   
    const [ data, setData ] = useState()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        current ?
            setNamesake({
                ...current.namesake,
                imageUrl: `${FP.S3_COHORTS}/${current.name.toLowerCase()}/avatar.jpeg`
            })
            : setNamesake({
                name: 'What our clients say',
                imageUrl: FP.HERO_WOMAN1,
                materials: [
                    { type: 'video', url: 'f5RNSRC7NP4' }
                ]
            })
    }, [current])

    useEffect(() => {
        let group = location.pathname == '/available' ? ({
            status: "available",
            isLive: true,
            showModal: true
        }) : current
        
        setData(group)
    }, [current, pathname])

    const renderHeader = () => {
        let header = available && "We are now available for interviews!"
        header ||= data.isLive ? `We are the ${data.name} cohort.` : `The ${data.name} cohort is coming soon!`
        return header
    }

    const renderSummary = () => {
        let summary;

        switch(data.status){
            case 'available':
                summary = 'We have been working hard and are excited to join a commercial team!'
                break;
            case 'graduated':
                summary = `We graduated on ${data.endDate.format("MMMM Do YYYY")}!`
                break;
            case 'current':
                summary = "We're currently honing our skills on futureproof's 13 week course!"
                break;
            case 'preview':
                summary = `We recently started our course and are working hard!`
                break;
            case 'upcoming':
                summary = `We are excited to start our course on ${data.startDate.format("MMMM Do YYYY")}!`
                break;
        }

        summary += data.showModal ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${data.addMaterialsDate.format("MMMM Do")}.`

        return summary
    }

    return (
        <div className="bg-purple" style={{ padding: '0 80px' }}>
            <div className="header-container" style={{ maxWidth: '1500px'}}>
            <div>
                <a href={FP.WWW} target="_blank" rel="noopener">
                    <img id="logo" src={FP.LOGO_WHITE} alt="futureproof logo" style={{ width: '180px', padding: '16px' }} />
                </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '40vh'}}>
                <div className="header-text-container" style={{ whiteSpace: 'pre-line'}}>
                    { !loading && data && data.status && (
                        <>
                        <Heading
                            size="huge"
                            color="white"
                            content={renderHeader()}
                        />

                        <Heading
                            size="small"
                            color="white"
                            content={renderSummary()}
                        />
                        {/* {renderSummary()} */}
                        </>
                    )}

                    { (!data || loading) && (<Heading
                            size="huge"
                            color="white"
                            content="Meet the futureproof cohorts"
                        />)
                    }

                    { location.pathname === '/' && (
                        <Heading
                            size="small"
                            color="white"
                            content="Here you can see all our cohorts and find associate profiles."
                        />
    
                    )}


                        
                        <div style={{display: 'flex'}}>
                            <span className="btn bg-lime"
                                onClick={() => pathname === '/available' ? navigate('/') : navigate('/available')}
                                style={{ width: 'fit-content', marginRight: '20px' }}
                            >
                                { pathname === '/available' ? "See all cohorts" : "See all associates currently available for interviews" }
                            </span>

                            <ContactBtn mini />

                        </div>
            
                

                    
                </div>
                <div className="hero-image-container">
                    {namesake && (
                        <img
                            id="namesake" src={namesake.imageUrl}
                            alt={namesake.name}
                            className={namesake.imageUrl.match(/(hero|device)/g) ? 'fp-image': 'framed angles'}
                            onError={e => e.target.src = FP.DEVICE}
                            onClick={() => navigate('/')} />
                        // onClick={() => feature(namesake)}/>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}
