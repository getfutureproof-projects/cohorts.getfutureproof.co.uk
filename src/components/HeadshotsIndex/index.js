import React, { useState, useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { useWindowSize } from '../../hooks/windowSize'
import { Headshot, BackBtn } from '../'
import './style.css'

export default function HeadshotsIndex() {
    const { current } = useCohort()
    const screen = useWindowSize()
    const [ styles, setStyles ] = useState({ 
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(2, auto)"
    })

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
            } else if (screen.width <= 1920){
                numCols = 6;
            }
            updates ||= {
                gridTemplateColumns: `repeat(${numCols}, var(--squareSizeLarge))`,
                gridTemplateRows: `repeat(${Math.ceil((current.students.length + (summ || 3)) / numCols)}, var(--squareSizeLarge))`,
            }
            setStyles(updates)
        }

        calcStyles()
    }, [screen])

    const renderHeadshots = current.students.map((s, i) => <Headshot key={i} person={s}/>)

    const renderSummary = () => {
        let summary;

        switch(current.status){
            case 'graduated':
                summary = `We graduated on ${current.endDate.format("MMMM Do YYYY")}!`
                break;
            case 'current':
                summary = "We're currently honing our skills on futureproof's 13 week course!"
                break;
            case 'preview':
                summary = `We recently started our course and are working hard!`
                break;
            case 'upcoming':
                summary = `We are excited to start our course on ${current.startDate.format("MMMM Do YYYY")}!`
                break;
        }

        summary += current.showModal ? '\nClick on our picture to find out more about us.' : `\nOur profiles will be available from ${current.addMaterialsDate.format("MMMM Do")}.`

        return summary
    }

    return (
        <section id="container" style={styles}>
                <>
                <div id="summary_container">
                    <h2><BackBtn path="/" /> {
                        current.isLive ? 
                            `Hello! We are the ${current.name} cohort.`
                            : `The ${current.name} cohort is coming soon!`
}                   </h2>
                    <p id="cohort-summary">{ renderSummary() }</p>
                </div>
                { current.isLive && renderHeadshots }
                </>

        </section>
    )
}
