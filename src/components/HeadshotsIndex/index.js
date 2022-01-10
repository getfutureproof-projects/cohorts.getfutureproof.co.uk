import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useCohort } from '../../contexts/cohort'
import { useWindowSize } from '../../hooks/windowSize'
import { Headshot, BackBtn } from '../'
import { Heading } from '@getfutureproof/fpsb'
import './style.css';
import { Card } from '../../forsb/Card';
import { Section } from '../../forsb/Section'

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
                numCols = 4;
            // } else if (screen.width <= 1300){
            //     numCols = 5;
            } else {
                numCols = 6;
            }

            containerUpdates ||= { 
                gridTemplateColumns: `repeat(${numCols}, var(--squareSizeLarge))`,
                gridTemplateRows: "repeat(2, auto)"
            }

            if(!screen.portrait && data) {
                let summWidth = 4
                let numRows = Math.ceil((data.students.length + summWidth) / numCols);
    
                if(showAvailable){
                    // summWidth = screen.width <= 1300 ? 5 : 6;
                    summWidth = 6
                } else if (screen.width > 1300 && (data.students.length - 2) % numRows === 1) {
                    summWidth = 3
                }

                numRows = Math.ceil((data.students.length + summWidth) / numCols);

                summaryUpdates = {
                    gridColumn: `span ${summWidth}`,
                    textAlign: showAvailable ? 'center' : 'left'
                }

                containerUpdates = {
                    gridTemplateColumns: `repeat(${numCols}, var(--squareSizeLarge))`,
                    gridTemplateRows: `repeat(${numRows}, var(--squareSizeLarge))`,
                }
            }

            setContainerStyles(containerUpdates)
            setSummaryStyles(summaryUpdates)
        }

        calcStyles()
    }, [screen, data])

    function loadStudent(toFeature){
        let entryPoint = showAvailable ? 'available' : cohort;
        feature(toFeature, entryPoint)
    }

    const renderHeadshots = () => data.students.map((s, i) => <Headshot key={i} person={s} loadStudent={loadStudent}/>)

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
        <section id="container" style={containerStyles}>
            {  data && data.students && (
                <>
                <div id="summary_container" style={summaryStyles}>
                    {/* <BackBtn path="/" /> */}
                    <Heading
                        size="large"
                        content={renderHeader()}
                    />
                    {/* <p id="cohort-summary" className="italic">{ renderSummary() }</p> */}
                    {/* <Section> */}
                    <p id="cohort-summary">
                        {
                            showAvailable ? (
                                <Section>
                                        <Card
                                        shadow inverted
                                        colorway='lime'
                                    >
                                        {renderSummary()}
                                    </Card>
                                </Section>
                            ):(<Card
                                shadow inverted
                                colorway='lime'
                            >
                                {renderSummary()}
                            </Card>)
                        }   
                    </p>
                    {/* </Section> */}
                </div>
                { data.isLive && renderHeadshots() }
                </>
            )}  
        </section>        
    )
}
