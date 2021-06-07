import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackBtn({ path }) {
    const history = useHistory()

    const handleClick = () => {
        path ? history.push(path) : history.goBack()
    }

    return (
        <span id="back-btn" onClick={handleClick}>
            ⇦
        </span>
    )
}
