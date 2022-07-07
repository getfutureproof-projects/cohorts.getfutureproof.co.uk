import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useCohort } from '../../contexts/cohort';
import * as FP from '../../_assets';
import './style.css'

export default function Header() {
    const { current, feature, available } = useCohort()
    const [namesake, setNamesake] = useState()   
    const [ data, setData ] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        current ?
            setNamesake({
                ...current.namesake,
                imageUrl: `${FP.S3_COHORTS}/${current.name.toLowerCase()}/avatar.jpeg`
            })
            : setNamesake({
                name: 'What our clients say',
                imageUrl: FP.HERO_WOMAN1,
                materials: [
                    { type: 'video', url: 'f5RNSRC7NP4' }
                ]
            })
    }, [current])

    useEffect(() => {
        let group = available ? ({
            // status: "available",
            isLive: true
        }) : current
        
        setData(group)
    }, [available])

    const renderHeader = () => {
        let header = available && "Hello! We are now available for interviews!"
        header ||= data.isLive ? `Hello! We are the ${data.name} cohort.` : `The ${data.name} cohort is coming soon!`
        return header
    }

    return (
        <div>
            <div className="bg-purple">
                <a href={FP.WWW} target="_blank" rel="noopener">
                    <img id="logo" src={FP.LOGO_WHITE} alt="futureproof logo" style={{ width: '180px' }} />
                </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '30vh'}}>
                <div className="bg-purple">
                    <p>{ data && renderHeader()}</p>
                </div>
                <div className="bg-purple">
                    {namesake && (
                        <img
                            id="namesake" src={namesake.imageUrl}
                            alt={namesake.name}
                            onError={e => e.target.src = FP.DEVICE}
                            onClick={() => navigate('/')} />
                        // onClick={() => feature(namesake)}/>
                    )}
                </div>
            </div>

        </div>
    )
}
