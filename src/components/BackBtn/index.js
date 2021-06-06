import React from 'react'
import { useHistory } from 'react-router-dom'

export default function BackBtn() {
    const { goBack } = useHistory()

    return (
        <span id="back-btn" onClick={goBack}>
            ⇦
        </span>
    )
}
