import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort';
import { useWindowSize } from '../../hooks/windowSize';
import CohortCard from '../CohortCard';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

import { Card } from '@getfutureproof/fpsb';

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
            // } else if (screen.width <= 1300){
            //     numCols = 5;
            } else {
                numCols = 4;
            }

            containerUpdates ||= { 
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                gridTemplateRows: "repeat(2, auto)"
            }

            if(!screen.portrait && list) {
                // let summWidth = 4
                // let numRows = Math.ceil((data.students.length + summWidth) / numCols);
    
                // if(showAvailable){
                //     summWidth = 6
                // } else if (screen.width > 1300 && (data.students.length - 2) % numRows === 1) {
                //     summWidth = 3
                // }

                // numRows = Math.ceil((data.students.length + summWidth) / numCols);

                // summaryUpdates = {
                //     gridColumn: `span ${summWidth}`,
                //     textAlign: showAvailable ? 'center' : 'left'
                // }

                containerUpdates = {
                    gridTemplateColumns: `repeat(${numCols}, 1fr)`
                }
            }

            setContainerStyles(containerUpdates)
            // setSummaryStyles(summaryUpdates)
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
                {/* <div id="container" style={containerStyles}> */}

                    { recent.map((c, i) => (  
                        <CohortCard
                            key={c.name}
                            name={c.name}
                            timeline={formatEndDate(c)}
                            action={() => navigate(`/${c.name}`)}
                        >
                            
                        </CohortCard>
                    )) }

                </div>
            )}

{/* 
            { list && (
                <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1232px', justifyContent: 'center'}}>

                    { previous.map((c, i) => (  
                        <span 
                            className='btn text-white bg-purple medium regular'
                            onClick={
                                () => navigate(`/${c.name}`)
                            }>
                                <p width='100%' className='text-display medium'>{`${c.name.toUpperCase()}\n`} </p>
                                ({c.endDate.format("MMM Do YY")})
                            
                            </span>
                    )) }

                </div>
            )} */}

            {/* { list && (
                <div style={{display: 'flex', flexWrap: 'wrap', maxWidth: '1232px', justifyContent: 'center'}}>
                    { list.map((c, i) => (  
                        <Card
                            key={c.name}
                            colorway='lemon'
                            // inverted
                            hoverEffect
                            title={c.name}
                            variant="square"
                            width="200px"
                            shadow
                            onClick={() => navigate(`/${c.name}`)}
                        >
                            {formatEndDate(c)}
                        </Card>
                    )) }
                </div>
            )} */}

        </>
    )
}


        // <Link to={`/${c.name}`} key={c.name}>
                        //     <div className="cohort-preview" style={{backgroundColor: colors.purple}}>
                        //         <span className="name">{c.name}</span>
                        //         <span className="date italic">{formatEndDate(c)}</span>
                        //     </div>
                        // </Link>
