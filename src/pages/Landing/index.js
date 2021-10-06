import React from 'react'
import { useHistory } from 'react-router'
import { CohortsIndex, Button } from '../../components'
import SEO from '../SEO'
import './style.css'

export default function Landing() {
    const history = useHistory()

    const formatText = (text) => {
        let words = text.split(" ");
        let perLine = Math.ceil(words.length/3);
        let formatted = ""
        let trackr = 0;
        for(let word of words){
            console.log(trackr, perLine);
            formatted += `${word} `
            if(trackr === perLine){
                console.log('adding break after', word);
                formatted += "\n"
                trackr = 0;
            }
            trackr++
        }
        return <p style={{ whiteSpace: "pre-wrap"}}>{formatted}</p>;
    }

    return (
        <>
            <SEO topic="index"/>
            <h1 id="greeting" className="shimmer static">Welcome to futureproof!</h1>

            <Button
                text="See all associates currently available for interviews"
                action={() => history.push('/available')}
            />

            <div id="summary" className="italic">
                <p>Here you can see all our cohorts and find associate CVs, video introductions and portfolio links.</p>
                <p>For more information on futureproof or any of our associates, contact us below.</p>
            </div>

            <CohortsIndex />
        </>
    )
}
