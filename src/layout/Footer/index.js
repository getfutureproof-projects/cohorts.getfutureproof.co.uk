import React, { useState, useEffect }  from 'react'
import './style.css'
import { ContactBtn } from '../../components'
import { useWindowSize } from '../../hooks/windowSize';

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const screen = useWindowSize()
    const [ footerStyles, setFooterStyles ] = useState({})

    useEffect(() => {   
        window.addEventListener("scroll", listenToScroll);
        return () => 
           window.removeEventListener("scroll", listenToScroll); 
      }, [])

      const listenToScroll = () => {
        let showPoint = (window.innerHeight/20)*20;
        const winScroll = document.body.scrollTop || 
            document.documentElement.scrollTop;
           
        if (winScroll > showPoint) { 
           !isVisible &&         
             setIsVisible(true);
        } else {
             setIsVisible(false);
        }  
      };

      useEffect(() => {
        let styles = screen.portrait ? ({
            outer: { padding: '50px 16px 0', display: 'flex', justifyContent: 'center' },
            tSpanClass: 'small',
            bSpanClass: 'tiny'
        }) : ({
            outer: { padding: '50px 60px 0', display: 'flex', justifyContent: 'center' },
            tSpanClass: 'medium',
            bSpanClass: 'small'
        }) 

        setFooterStyles(styles)
    }, [screen])

    return (
        <footer className={isVisible ? 'visible' : 'hidden'} style={footerStyles.outer}>
            <div className="footer-container" style={{ width: '100%', maxWidth: '1500px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', gap: '35px' }}>

                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span className={`${footerStyles.tSpanClass} text-body`}>Still looking for the right candidate?</span>
                    <span className={`${footerStyles.bSpanClass} regular`}>Our expert team can help you build the teams you need to thrive.</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ContactBtn mini />
                </div>

            </div>
        </footer>
    )
}
