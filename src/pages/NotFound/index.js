import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function NotFound() {
    return (
        <div id="oops">
            <h2>Oops!</h2>
            <p>That page does not exist! Let's go <Link to="/">home.</Link></p>
        </div>
    )
}
