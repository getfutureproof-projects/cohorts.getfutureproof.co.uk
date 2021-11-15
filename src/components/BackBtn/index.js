import React from 'react'
import { useHistory } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'

export default function BackBtn({ path }) {
    const history = useHistory()
    const { setError } = useCohort()

    const handleClick = () => {
        setError(false)
        path ? history.push(path) : history.goBack()
    }

    return (
        <span id="back-btn" className="btn" onClick={handleClick} style={{position: 'relative', left: '-20px'}}>
            ⇦
        </span>
    )
}
