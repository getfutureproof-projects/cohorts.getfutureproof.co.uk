import React from 'react'
import './style.css'
import { Heading } from '@getfutureproof/fpsb'
import { ContactBtn } from '../../components'

export default function Footer() {
    return (
        <footer style={{ padding: '30px 80px 0 80px', display: 'flex', justifyContent: 'center' }}>
            {/* <h3>
                <a href="http://getfutureproof.co.uk" target="_blank" rel="noopener">getfutureproof.co.uk</a>
            </h3> */}
            <div className="footer-container" style={{ width: '100%', maxWidth: '1500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingBottom: '20px' }}>

                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span className="medium text-body">Still looking for the right candidate?</span>
                    <span className="small regular">Our expert team can help you build the teams you need to thrive.</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ContactBtn mini />
                </div>

            </div>
        </footer>
    )
}
