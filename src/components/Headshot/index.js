import React from 'react'

export default function Headshot({ person }) {
    return (
        <div className="img_container">
            { person.project && <img className="project_logo" src={person.project.logo} alt={person.project.name} /> }
            <img className="headshot" src={person.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt={person.name} />
            <button className="select">{person.name}</button>
        </div>
    )
}
