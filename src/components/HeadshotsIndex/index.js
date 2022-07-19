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
    const [cardShapes, setCardShapes] = useState(['angles', 'cog', 'star', 'shield'])
    const [cardColors, setCardColors] = useState(['coral', 'violet', 'lime', 'lemon'])

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
            if(screen.width < 650){
                containerUpdates = { 
                    gridTemplateColumns: "repeat(1, auto)",
                    gridTemplateRows: "repeat(1, auto)"
                }
            } else if(screen.width <= 1000){
                numCols = 2;
            } else if(screen.width <= 1300){
                numCols = 3;
            } else {
                numCols = 4;
            }

            containerUpdates ||= { 
                gridTemplateColumns: `repeat(${numCols}, 1fr)`,
                gridTemplateRows: "repeat(2, auto)"
            }

            // if(!screen.portrait && data) {
            //     containerUpdates = {
            //         gridTemplateColumns: `repeat(${numCols}, 1fr)`
            //     }
            // }

            setContainerStyles(containerUpdates)
        }

        calcStyles()
    }, [screen])

    useEffect(() => {
        let rand = shuffle(cardColors)
        if([rand[0], rand[rand.length-1]].includes("violet")){
            rand = [...rand.slice(0, rand.length/2), 'violet', ...rand.slice(rand.length/2 - 1)]
        } else {
            rand = [...rand, 'violet']
        }
        setCardColors(rand)
    }, [current])

    useEffect(() => {
        let rand = shuffle(cardShapes)
        if([rand[0], rand[rand.length-1]].includes("star")){
            rand = [...rand.slice(0, rand.length/2), 'star', ...rand.slice(rand.length/2 - 1)]
        } else {
            rand = [...rand, 'star']
        }
        setCardShapes(rand)
    }, [current])

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }

        return array
      }
      

    function loadStudent(toFeature){
        let entryPoint = showAvailable ? 'available' : (toFeature.cohort || current.name)
        feature(toFeature, entryPoint)
    }


    const renderHeadshots = () => data.students.map((s, i) => <Headshot key={i} idx={i} person={s} seeMore={data.showModal} frame={cardShapes[i % cardShapes.length]} colour={cardColors[i % cardColors.length]} loadStudent={loadStudent}/>)



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
