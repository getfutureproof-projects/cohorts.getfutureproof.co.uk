import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort'

export default function BackBtn({ path }) {
  const navigate = useNavigate()
  const { setError } = useCohort()

  const handleClick = () => {
    setError(false)
    path ? navigate(path) : navigate('/')
  }

  return (
    <span
      id="back-btn"
      className="bg-purple"
      style={{ position: 'relative', fontSize: '38px', paddingRight: '10px', cursor: 'pointer' }}
      onClick={handleClick}
    >
      ⇦
    </span>
  )
}
