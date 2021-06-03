import React from 'react'
import './style.css'

export default function Header({ namesake }) {
    return (
        <header>
            <img id="namesake" src={namesake.imageUrl} alt={namesake.name} />

            <a href="https://getfutureproof.co.uk" target="_blank" rel="noopener">
                <img id="logo" src="https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/futureproof_logotype_250x60.png" alt="futureproof logo" />
            </a>
        </header>
    )
}
