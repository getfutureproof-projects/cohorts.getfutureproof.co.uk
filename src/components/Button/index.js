import React from 'react'
import './style.css'

export default function Button({ text, action }) {

    return (
        <button className="cta pulse" onClick={action}>
            <h2 className="shimmer">
                { text }
            </h2>
        </button>
    )
}
