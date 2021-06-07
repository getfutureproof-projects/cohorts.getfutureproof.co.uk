import React from 'react'
import { Link } from 'react-router-dom'
import { BackBtn } from '../../components'
import SEO from '../SEO'

export default function NotFound() {
    return (
        <>
        <SEO topic="error" />
        <div id="oops">
            <h2>Oops!</h2>
            <p>That page does not exist! Let's go <Link to="/">home.</Link></p>
            <BackBtn path="/" /> 
        </div>
        </>
    )
}
