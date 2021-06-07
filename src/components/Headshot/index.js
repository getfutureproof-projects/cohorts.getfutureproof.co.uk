import React from 'react'
import { useCohort } from '../../contexts/cohort'

export default function Headshot({ person }) {
    const { feature, current } = useCohort()

    const handleSelect = (e, toFeature) => {
        e.stopPropagation()
        feature(toFeature)
    }

    return (
        <div className="img_container" onClick={e => handleSelect(e, person)}>
            { person.project && 
                <img className="project_logo"
                    src={`https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/${current.name.toLowerCase()}/projectLogos/${person.project.name.replace(' ', '')}.png`}
                    alt={person.project.name}
                    onClick={e => handleSelect(e, person.project)}
                /> }
            <img 
                className="headshot"
                src={
                    person.imageUrl ? 
                        person.imageUrl.normalize("NFD").replace(/\p{Diacritic}/gu, "") 
                        : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} 
                    alt={person.name} 
                />
                <button className="select">{person.name}</button>
        </div>
    )
}
