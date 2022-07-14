import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort';
import { useWindowSize } from '../../hooks/windowSize';
import CohortCard from '../CohortCard';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

export default function CohortsIndex() {
    let { list, error } = useCohort();
    const navigate = useNavigate();
    const screen = useWindowSize();
    const [recent, setRecent] = useState([]);
    const [previous, setPrevious] = useState([]);
    const [ containerStyles, setContainerStyles ] = useState({ 
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(2, auto)"
    })

    useEffect(() => {
        const calcStyles = () => {
            let containerUpdates, summaryUpdates, numCols;
            if(screen.portrait){
                containerUpdates = { 
                    gridTemplateColumns: "repeat(2, auto)",
                    gridTemplateRows: "repeat(2, auto)"
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

            if(!screen.portrait && list) {
                containerUpdates = {
                    gridTemplateColumns: `repeat(${numCols}, 1fr)`
                }
            }

            setContainerStyles(containerUpdates)
        }

        calcStyles()
    }, [screen, list])

    useEffect(() => {
        const recent = list ? list.slice(0, 8) : []
        const previous = list ? list.slice(8) : []
        setRecent(recent)
        setPrevious(previous)
    }, [list])

    const formatEndDate = cohort => {
        let formatted = cohort.endDate.format("MMMM Do YYYY")
        formatted = cohort.status === 'graduated' ? 
                        `Graduated on\n${formatted}`
                        : `Graduating ${cohort.endDate.fromNow()} \non ${formatted}`
        return formatted
    }

    return (
        <>
            { error && <h2 className="error">{error}</h2> }

            { list && (
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1232px', justifyContent: 'center'}}>
                    { recent.map((c, i) => (  
                        <CohortCard
                            key={c.name}
                            name={c.name}
                            timeline={formatEndDate(c)}
                            action={() => navigate(`/${c.name}`, {replace: true})}
                        >
                            
                        </CohortCard>
                    )) }

                </div>
            )}
        </>
    )
}