import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useCohort } from '../../contexts/cohort'
import { useWindowSize } from '../../hooks/windowSize'
import { Headshot, BackBtn } from '../'
import { Heading, Card, Section, Shape } from '@getfutureproof/fpsb'
import './style.css';

export default function HeadshotsIndex({ showAvailable }) {
    const { cohort, student } = useParams();
    const { current, available, feature } = useCohort()
    const [ data, setData ] = useState()
    
    const screen = useWindowSize()
    const [ containerStyles, setContainerStyles ] = useState({ 
        gridTemplateColumns: "repeat(2, auto)",
        gridTemplateRows: "repeat(2, auto)"
    })
    const [ summaryStyles, setSummaryStyles ] = useState({})

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

            if(!screen.portrait && data) {
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
            setSummaryStyles(summaryUpdates)
        }

        calcStyles()
    }, [screen, data])

    function loadStudent(toFeature){
        let entryPoint = showAvailable ? 'available' : (toFeature.cohort || current.name)
        feature(toFeature, entryPoint)
    }

    const renderGrid = () => {
        let items = renderHeadshots();
        let num = 20 - items.length;
        let offset = items.length/4;
        let placeholder = (kind, color) => <div style={{position: 'relative', height: '0', width: '0'}}><Shape kind={kind} color={color} /></div>
        let randIdx = Math.floor((Math.random() * offset) + offset);
        // while(num > 0){
        //     items = [...items.slice(0, randIdx), placeholder, ...items.slice(randIdx + 1)]
        //     num--
        // }
        items = [
            placeholder('cog', 'coral'),
            ...items.slice(0, items.length - 1),
            // ...items.slice(0, randIdx),
            // placeholder('star', 'lime'),
            // ...items.slice(randIdx + 1, randIdx + 1 + offset),
            // placeholder('shield', 'lemon'),
            // ...items.slice(randIdx + 2 + offset, items.length - 1),
            placeholder('angles', 'violet'),
            items[items.length - 1]
        ]
        // items.unshift(placeholder('cog', 'coral'))
        // items.push(placeholder('angles', 'violet'))
        return items
    }

    const renderHeadshots = () => data.students.map((s, i) => <Headshot key={i} idx={i} person={s} seeMore={data.showModal} loadStudent={loadStudent}/>)

    const renderHeader = () => {
        let header = showAvailable && "Hello! We are now available for interviews!"
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
        <>
            {  data && data.students && (
                <>
                {/* <div id="summary_container" style={summaryStyles}> */}
                {/* <Section direction='ttb' justifyContent='center'>
                    {/* <BackBtn path="/" /> */}
                    {/* <Heading
                        size="large"
                        content={renderHeader()}
                    /> */}

   
                       {/* <Card
                                inverted
                                colorway='lime'
                            
                            >
                                {renderSummary()}
                            </Card> */}

                    {/* </Section> */}
                <Section direction='ltr' justifyContent='space-between'>
                    <div id="container" style={containerStyles}>
                        { data.isLive && renderHeadshots() }
                    </div>
                </Section>
                </>
            )}  
        </>        
    )
}
