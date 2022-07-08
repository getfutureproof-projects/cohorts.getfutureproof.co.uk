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
            <div className="header-container" style={{ width: '100%', maxWidth: '1500px'}}>
            
            <div style={{textAlign: 'left'}}>
            <Heading
                size="medium"
                color="purple"
                content="Still looking for the right candidate?"
            />
            <Heading
                size="small"
                color="purple"
                content="Our expert team can help you build the teams you need to thrive."
            />
            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
            <ContactBtn mini/>
            </div>
            </div>
        </footer>
    )
}
