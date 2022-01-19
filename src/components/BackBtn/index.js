import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'

export default function BackBtn({ path }) {
    const navigate = useNavigate()
    const { setError } = useCohort()

    const handleClick = () => {
        setError(false)
        path ? navigate(path) : navigate(-1)
    }

    return (
        <span id="back-btn" className="btn" onClick={handleClick} style={{position: 'relative', left: '-20px'}}>
            ⇦
        </span>
    )
}
