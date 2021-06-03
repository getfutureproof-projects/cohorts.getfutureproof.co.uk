import React from 'react'

export default function Headshot({ person }) {
    return (
        <div className="img-container">
            { person.project && <img src={person.project.logo} alt={person.project.name} className="project-logo" /> }
            <img src={person.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt={person.name} />
            <button>{person.name}</button>
        </div>
    )
}
