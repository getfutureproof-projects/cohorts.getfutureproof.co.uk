import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useCohort } from '../../contexts/cohort'
import { useWindowSize } from '../../hooks/windowSize'
import { Headshot } from '../'
import { Section } from '@getfutureproof/fpsb'
import './style.css';

export default function HeadshotsIndex({ showAvailable }) {
    const { student } = useParams();
    const { current, available, feature } = useCohort()
    const [ data, setData ] = useState()
    
    const screen = useWindowSize()
    const [ containerStyles, setContainerStyles ] = useState({ 
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(2, auto)"
    })

    useEffect(() => {
        let group = showAvailable ? ({
            students: available.reverse(),
            showModal: true,
            status: "available",
            isLive: true
        }) : current
        
        setData(group)
    }, [showAvailable])
    
    useEffect(() => {
        if(student){
            loadStudent(student);
        }
    }, [data]);

    useEffect(() => {
        const calcStyles = () => {
            let containerUpdates, summaryUpdates, numCols;
            if(screen.portrait){
                containerUpdates = { 
                    gridTemplateColumns: "repeat(1, auto)",
                    gridTemplateRows: "repeat(1, auto)"
                }
            } else if(screen.width <= 1300){
                numCols = 3;
            } else {
                numCols = 4;
            }

            containerUpdates ||= { 
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                gridTemplateRows: "repeat(2, auto)"
            }

            if(!screen.portrait && data) {
                containerUpdates = {
                    gridTemplateColumns: `repeat(${numCols}, 1fr)`
                }
            }

            setContainerStyles(containerUpdates)
        }

        calcStyles()
    }, [screen, data])

    function loadStudent(toFeature){
        let entryPoint = showAvailable ? 'available' : (toFeature.cohort || current.name)
        feature(toFeature, entryPoint)
    }


    const renderHeadshots = () => data.students.map((s, i) => <Headshot key={i} idx={i} person={s} seeMore={data.showModal} loadStudent={loadStudent}/>)



    return (
        <>
            {  data && data.students && (
                <Section direction='ltr' justifyContent='space-between'>
                    <div id="container" style={containerStyles}>
                        { data.isLive && renderHeadshots() }
                    </div>
                </Section>
            )}  
        </>        
    )
}
