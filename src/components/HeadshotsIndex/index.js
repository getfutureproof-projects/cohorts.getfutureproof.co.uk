import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useWindowSize } from '../../hooks/windowSize'
import { Headshot, BackBtn } from '../'
import './style.css'

export default function HeadshotsIndex({ showAvailable }) {
    const { current, available } = useCohort()
    const [ data, setData ] = useState()
    
    const screen = useWindowSize()
    const [ styles, setStyles ] = useState({ 
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(2, auto)"
    })

    useEffect(() => {
        let group = showAvailable ? ({
                students: available,
                showModal: true,
                status: "available",
                isLive: true
            }) : current

        setData(group)
    }, [showAvailable])

    useEffect(() => {
        const calcStyles = () => {
            let updates, numCols, summ;
            if(screen.portrait){
                updates = { 
                    gridTemplateColumns: "repeat(2, auto)",
                    gridTemplateRows: "repeat(2, auto)"
                }
            } else if(screen.width <= 1100){
                numCols = 4;
                summ = 4;
            } else if (screen.width <= 1300){
                numCols = 5;
            } else {
                numCols = 6;
            }

            updates ||= { 
                gridTemplateColumns: `repeat(${numCols}, var(--squareSizeLarge))`,
                gridTemplateRows: "repeat(2, auto)"
            }

            if(data) {
                updates = {
                    gridTemplateColumns: `repeat(${numCols}, var(--squareSizeLarge))`,
                    gridTemplateRows: `repeat(${Math.ceil((data.students.length + (summ || 3)) / numCols)}, var(--squareSizeLarge))`,
                }
            }

            setStyles(updates)
        }

        calcStyles()
    }, [screen, data])

    const renderHeadshots = () => data.students.map((s, i) => <Headshot key={i} person={s}/>)

    const renderHeader = () => {
        let header = showAvailable && "Hello! We are open for consultation!"
        header ||= data.isLive ? `Hello! We are the ${data.name} cohort.` : `The ${data.name} cohort is coming soon!`
        return header
    }

    const renderSummary = () => {
        let summary;

        switch(data.status){
            case 'available':
                summary = 'We have been working hard and are excited to join a commercial team!'
                break;
            case 'graduated':
                summary = `We graduated on ${data.endDate.format("MMMM Do YYYY")}!`
                break;
            case 'current':
                summary = "We're currently honing our skills on futureproof's 13 week course!"
                break;
            case 'preview':
                summary = `We recently started our course and are working hard!`
                break;
            case 'upcoming':
                summary = `We are excited to start our course on ${data.startDate.format("MMMM Do YYYY")}!`
                break;
        }

        summary += data.showModal ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${data.addMaterialsDate.format("MMMM Do")}.`

        return summary
    }

    return (
        <section id="container" style={styles}>
            {  data && data.students && (
                <>
                <div id="summary_container">
                    <h2><BackBtn path="/" /> 
                        { renderHeader() }
                    </h2>
                    <p id="cohort-summary">{ renderSummary() }</p>
                </div>
                { data.isLive && renderHeadshots() }
                </>
            )}  
        </section>        
    )
}
