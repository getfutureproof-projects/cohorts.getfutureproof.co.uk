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
    const [cardShapes, setCardShapes] = useState(['angles', 'cog', 'star', 'shield'])
    const [cardColors, setCardColors] = useState(['coral', 'lime', 'lemon'])
    const [previous, setPrevious] = useState([]);
    const [showPrevious, setShowPrevious] = useState(false);
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

    useEffect(() => {
        let rand = shuffle(cardColors)
        if([rand[0], rand[rand.length-1]].includes("coral")){
            rand = [...rand.slice(0, rand.length/2), 'lime', ...rand.slice(rand.length/2 - 1)]
        } else {
            rand = [...rand, 'lemon']
        }
        setCardColors(rand)
    }, [])

    useEffect(() => {
        let rand = shuffle(cardShapes)
        if([rand[0], rand[rand.length-1]].includes("star")){
            rand = [...rand.slice(0, rand.length/2), 'star', ...rand.slice(rand.length/2 - 1)]
        } else {
            rand = [...rand, 'star']
        }
        setCardShapes(rand)
    }, [])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array
      }

    const formatEndDate = cohort => {
        let formatted = cohort.endDate.format("MMMM Do YYYY")
        const date = new Date()
        if (cohort.status === 'event') {
            if (cohort.endDate != cohort.endDate['$D'] && cohort.endDate != cohort.endDate['$M'] && cohort.endDate != cohort.endDate['$y']) {
                // formatted = `Presented on\n${formatted}` for after is presented
                formatted = `Presenting on\n${formatted}`
                return formatted
            }
            formatted = `Presenting on \n${formatted}`
            return formatted
        } else{
            formatted = cohort.status === 'graduated' ? 
            `Graduated on\n${formatted}`
            : `Graduating ${cohort.endDate.fromNow()} \non ${formatted}`
            return formatted
        }
    }

    return (
        <>
            { error && <h2 className="error">{error}</h2> }
            { list && (
                <>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1232px', justifyContent: 'center', marginBottom: '20px'}}>
                    { recent.map((c, i) => (  
                        <CohortCard
                            key={c.name}
                            name={c.name}
                            timeline={formatEndDate(c)}
                            action={() => navigate(`/${c.name}`, {replace: true})}
                            frame={cardShapes[i % cardShapes.length]} colour={cardColors[i % cardColors.length]} 
                        >
                        </CohortCard>
                    )) }
                </div>
                <div style={{width: "100vw", display:  'flex', justifyContent: 'center', cursor: 'pointer'}}>
                    <span id='all-button' className="bg-lime"
                            onClick={() => setShowPrevious(p => !p)}
                        >
                            {showPrevious ? "Hide previous cohorts" : "See all previous cohorts" } <span>&#10230;</span>
                    </span>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', maxWidth: '1232px', justifyContent: 'center'}}>
                    { showPrevious && previous.map((c, i) => (  
                        <CohortCard
                            key={c.name}
                            name={c.name}
                            timeline={formatEndDate(c)}
                            action={() => navigate(`/${c.name}`, {replace: true})}
                            frame={cardShapes[i % cardShapes.length]} colour={cardColors[i % cardColors.length]} 
                        >
                        </CohortCard>
                    )) }
                </div>
                </>
            )}
        </>
    )
}
