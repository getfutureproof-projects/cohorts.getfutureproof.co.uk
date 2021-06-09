import React from 'react'
import { useCohort } from '../../contexts/cohort'

export default function Headshot({ person }) {
    const { feature, current } = useCohort()

    const handleSelect = (e, toFeature) => {
        e.stopPropagation()
        feature(toFeature)
    }

    const normalise = str => str.normalize("NFD").replace(/\p{Diacritic}/gu, "") 

    return (
        <div className="img_container" onClick={current.showModal ? (e => handleSelect(e, person)) : undefined}>
            { person.project && 
                <img className="project_logo"
                    src={`https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/${current.name.toLowerCase()}/projectLogos/${person.project.name.replace(' ', '')}.png`}
                    alt={person.project.name}
                    onClick={e => handleSelect(e, person.project)}
                /> }
                <img 
                    className="headshot"
                    src={`https://futureproof-public-documents.s3.eu-west-2.amazonaws.com/${current.name.toLowerCase()}/headshots/${normalise(person.name).replace(/\s/gu, '_')}.png`}
                    onError={e => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg'}
                    alt={person.name} 
                />
                <button className="select">{person.name}</button>
        </div>
    )
}
