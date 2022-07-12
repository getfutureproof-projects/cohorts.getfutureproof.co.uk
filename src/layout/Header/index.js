import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router'
import { useCohort } from '../../contexts/cohort';
import { Heading } from '@getfutureproof/fpsb'
import * as FP from '../../_assets';
import './style.css'
import ContactBtn from '../../components/ContactBtn';
import { useWindowSize } from '../../hooks/windowSize';

export default function Header() {
    const [ headerText, setHeaderText ] = useState('Meet the futureproof cohorts')
    const [ summaryText, setSummaryText ] = useState('Here you can see all our cohorts and find associate profiles.')
    const [ heroImg, setHeroImg ] = useState(FP.HERO_WOMAN1)
    const [ headerStyles, setHeaderStyles ] = useState({})
    const { current } = useCohort()  
    const screen = useWindowSize()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        current ?
            setHeroImg(`${FP.S3_COHORTS}/${current.name.toLowerCase()}/avatar.jpeg`) 
            : setHeroImg(FP.HERO_WOMAN1)
    }, [current])

    useEffect(() => {
        let header = "Meet the futureproof cohorts"
        let summary = "Here you can see all our cohorts and find associate profiles."
        let data
        if(pathname === '/available'){
            data = {
                status: "available",
                isLive: true,
                showModal: true
            }
            header = "Our candidates"
            summary = "We have been working hard and are excited to join a commercial team!"
        } else if (current) {
            data = current
            header = data.isLive ? `We are the ${data.name} cohort.` : `The ${data.name} cohort is coming soon!`
            switch(data.status){
                case 'graduated':
                    summary = `We graduated on ${data.endDate.format("MMMM Do YYYY")}!`
                    break;
                case 'current':
                    summary = "We're currently honing our skills on futureproof's intensive training course!"
                    break;
                case 'preview':
                    summary = `We recently started our course and are working hard!`
                    break;
                case 'upcoming':
                    summary = `We are excited to start our course on ${data.startDate.format("MMMM Do YYYY")}!`
                    break;
            }
        }


        if(data) {
            summary += data.showModal ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${data.addMaterialsDate.format("MMMM Do")}.`
        }
        setHeaderText(header)
        setSummaryText(summary)
        // setData(data)
    }, [current, pathname])

   
    useEffect(() => {
        let styles = screen.portrait ? ({
            outer: { padding: 0, display: 'flex', justifyContent: 'center' },
            container: { width: '100vw' },
            logo: { width: '180px', padding: '0', margin: '16px 32px' },
            logoWrapper: {marginRight: '80px'},
            grid: { display: 'block' },
            headerTextCont: { padding: '30px 16px 0 16px', display: 'flex', flexDirection: 'column', alignContent: 'center', whiteSpace: 'pre-line' },
            heroImgCont: { display: 'none' },
            btnGroup: { display: 'flex', marginTop: '15px', marginBottom: '10px' },
            bSpanClass: 'tiny'
        }) : ({
            outer: { padding: '0 80px', display: 'flex', justifyContent: 'center' },
            container: { width: '100%', maxWidth: '1500px'},
            logo: { width: '180px', padding: '16px', margin: 0 },
            logoWrapper: {},
            grid: { display: 'grid', gridTemplateColumns: '1fr 40vh', height: '40vh'},
            headerTextCont: { padding: '30px 0 0 16px', display: 'flex', flexDirection: 'column', alignContent: 'center', whiteSpace: 'pre-line' },
            heroImgCont: { display: 'flex', justifyContent: 'flex-end', position: 'relative' },
            btnGroup: { display: 'flex', marginTop: '30px', marginBottom: 0 },
            bSpanClass: 'small'
        }) 

        setHeaderStyles(styles)
    }, [screen])

    return (
        <div className="bg-purple header-wrapper" style={{...headerStyles.outer}}>
            <div className="header-container" style={headerStyles.container}>
            <div style={headerStyles.logoWrapper}>
                <a href={FP.WWW} target="_blank" rel="noopener">
                    <img id="logo" src={FP.LOGO_WHITE} alt="futureproof logo" style={headerStyles.logo} />
                </a>
            </div>

            <div style={headerStyles.grid}>
                <div className="header-text-container" style={headerStyles.headerTextCont}>

                        <Heading
                            size="xlarge"
                            color="white"
                            content={headerText}
                        />

                        <span className={`${headerStyles.bSpanClass} regular`}>{summaryText}</span>
                        
                        <div style={headerStyles.btnGroup}>
                            <span className="btn bg-lime"
                                onClick={() => pathname === '/available' ? navigate('/') : navigate('/available')}
                                style={{ width: 'fit-content', marginRight: '20px' }}
                            >
                                { pathname === '/available' ? "See all cohorts" : "Find talent" }
                            </span>

                            <ContactBtn mini />

                        </div>
                    
                </div>
                <div className="hero-image-container" style={{...headerStyles.heroImgCont}}>
                    {heroImg && (
                        <div className={`hero-wrapper ${heroImg.match(/(hero|device)/g) ? 'original': 'filtered'}`}>
                        <img
                            id="namesake" src={heroImg}
                            alt={current ? current.namesake.name : 'futureproof'}
                            className={heroImg.match(/(hero|device)/g) ? 'fp-image': 'framed angles'}
                            onError={() => setHeroImg(FP.DEVICE)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    )
}
