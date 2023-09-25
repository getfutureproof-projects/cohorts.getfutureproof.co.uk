import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router'
import { useCohort } from '../../contexts/cohort';
// import { Heading } from '@getfutureproof/fpsb'
import * as FP from '../../_assets';
import './style.css'
import { ContactBtn, BackHomeBtn } from '../../components'
import { useWindowSize } from '../../hooks/windowSize';

export default function Header() {
    const [headerText, setHeaderText] = useState('Meet our cohorts')
    const [summaryText, setSummaryText] = useState('Here you can see all our cohorts and find associate profiles.')
    const [infoText, setInfoText] = useState('We find, train, and place the tech superstars of tomorrow bringing high-quality, diverse talent to your workplace with a retention plan for the long term.')
    const [heroImg, setHeroImg] = useState(FP.HERO_STAR)
    const [headerStyles, setHeaderStyles] = useState({})
    const { current } = useCohort()
    const screen = useWindowSize()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        current ?
            setHeroImg(`${FP.S3_COHORTS}/${current.name.toLowerCase()}/avatar.jpeg`)
            : setHeroImg(FP.HERO_STAR)
    }, [current])

    
    useEffect(() => {
        let header = "Meet our cohorts"
        let summary = "Here you can see all our cohorts and find associate profiles."
        let data
        if (pathname === '/available') {
            data = {
                status: "available",
                isLive: true,
                showModal: true
            }
            header = "Our candidates"
            summary = "We have been working hard and are excited to join a commercial team!"
        } else if (current) {
            data = current
            if (data.name == 'La fosse academy presents'){
                let words = data.name.split(' ')
                for (let i = 0; i < words.length; i++){
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
                }
                let newHeader = words.join(' ')
                header = `${newHeader}`
            } else {
                header = data.isLive ? `We are the ${data.name} cohort.` : `The ${data.name} cohort is coming soon!`
            }
            switch (data.status) {
                case 'graduated':
                    summary = `We graduated on ${data.endDate.format("MMMM Do YYYY")}!`
                    break;
                case 'current':
                    summary = "We're currently honing our skills on La Fosse Academy intensive training course!"
                    break;
                case 'preview':
                    summary = `We recently started our course and are working hard!`
                    break;
                case 'upcoming':
                    summary = `We are excited to start our course on ${data.startDate.format("MMMM Do YYYY")}!`
                    break;
                case 'event':
                    summary = `Our event showcases some of the best up-and-coming tech talent from the La Fosse Academy.`
                    break;
            }
        }
        if (data) {
            if (data.status === 'event'){
                summary += data.showModal ? '\nClick on our picture to find out more about us.' : `\nYou can get in touch to find out more about how our Academy can reshape team building and futureproof your workforce.`
            } else {   
                summary += data.showModal ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${data.addMaterialsDate.format("MMMM Do")}.`
            }
        }
        setHeaderText(header)
        setSummaryText(summary)
        // setData(data)
    }, [current, pathname])

    useEffect(() => {
        let styles = ({
            outer: { padding: '0 80px', display: 'flex', justifyContent: 'center', overflow: 'hidden', position: ' relative', height: '75vh', maxHeight: '700px' },
            container: { width: '100%', maxWidth: '1500px' },
            logo: { width: '180px', padding: '16px', margin: 0 },
            logoWrapper: {},
            grid: { display: 'grid', gridTemplateColumns: '1fr 40vh', height: '40vh' },
            headerTextCont: { padding: '30px 0 0 16px', display: 'flex', flexDirection: 'column', alignContent: 'center', zIndex: 1, whiteSpace: 'pre-line', margin: '20px 30px 0 0' },
            heroImgCont: { display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0', height: '100%' },
            btnGroup: { display: 'flex', marginTop: '30px', marginBottom: 0 },
            bSpanClass: 'small',
            titleSize: 'huge',
            title: { lineHeight: '88px' }
        })


        if (screen.width < 950) {
            styles = ({
                outer: { padding: 0, display: 'flex', justifyContent: 'center' },
                container: { width: '100vw' },
                logo: { width: '180px', padding: '0', margin: '16px 32px' },
                logoWrapper: { marginRight: '80px' },
                grid: { display: 'block' },
                headerTextCont: { padding: '30px 0 0 16px', display: 'flex', flexDirection: 'column', zIndex: 1, alignContent: 'center', whiteSpace: 'pre-line' },
                heroImgCont: { display: 'none' },
                btnGroup: { display: 'flex', marginTop: '15px', marginBottom: '10px', zIndex: 1 },
                bSpanClass: 'tiny',
                titleSize: 'xlarge',
                title: { lineHeight: '64px' }
            })
        } else if (screen.width < 1200) {
            styles = { ...styles, titleSize: 'xlarge', title: { ...styles.title, margin: '0 0 0.67em 0', lineHeight: '64px' } }
        } else if (screen.width < 1200) {
            styles = { ...styles, title: { ...styles.title, margin: '0 0 0 0' } }
        } else if (screen.width < 1263) {
            styles = { ...styles, title: { ...styles.title, margin: '0 0 0.67em 0' } }
        }

        if (screen.height < 900 & screen.width > 950) {
            styles = { ...styles, outer: { ...styles.outer, height: '650px' } }
        }


        setHeaderStyles(styles)
    }, [screen])

    return (
        <div className={`bg-purple header-wrapper`} style={{ ...headerStyles.outer }}>
            <div className="header-container" style={headerStyles.container}>
                <div style={headerStyles.logoWrapper}>
                    <a href={FP.WWW} target="_blank" rel="noopener">
                        <img id="logo" src={FP.ACADEMY_LOGO_2} alt="La Fosse Academy logo" />
                    </a>
                </div>
                <div style={headerStyles.grid}>
                    <div className="header-text-container" style={headerStyles.headerTextCont}>
                        <p className='header-p text white'>
                            {pathname === "/" ? "" : <BackHomeBtn />}
                            {headerText}
                        </p>
                        {/* <span id='new-info'></span> */}
                        <br />
                        <span id='summary' className={`${headerStyles.bSpanClass} regular`}>{summaryText}</span>
                        <div style={headerStyles.btnGroup}>
                            <button id='all-button' className="bg-lemon text-purple"
                                onClick={() => pathname === '/available' ? navigate('/') : navigate('/available')}
                            >
                                {pathname === '/available' ? "See all cohorts" : "Find talent"} <span>&#10230;</span>
                            </button>
                            <ContactBtn mini />
                        </div>
                        <div className="hero-image-container" style={{ ...headerStyles.heroImgCont }}>
                            {heroImg && (
                                <div className={`hero-wrapper ${heroImg.match(/(hero|device)/g) ? `original ${heroImg.match(/(hero)/g) ? 'hero' : ''}` : 'filtered'}`}>
                                    <img
                                        id="namesake" src={heroImg}
                                        alt={current ? current.namesake.name : 'La Fosse Academy'}
                                        className={heroImg.match(/(hero|device)/g) ? 'image' : 'framed angles'}
                                        onError={() => setHeroImg(FP.HERO_STAR)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
