import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function CohortsIndex() {
    const [ error, setError ] = useState()
    const [ cohorts, setCohorts ] = useState()

    useEffect(() => {
        async function fetchCohorts(){
            try {
                const { data } = await axios.get('https://raw.githubusercontent.com/getfutureproof-admin/cohorts/main/db.json')
                let graduated = []
                let current = []

                for (let cohort of data.cohorts){
                    let startDate = new Date(cohort.startDate)
                    let today = new Date()
                    let weeksSinceStart = Math.round((today - startDate) / (7 * 24 * 60 * 60 * 1000));
                    weeksSinceStart > 13 ? graduated.push(cohort) : current.push(cohort)
                }

                setCohorts({
                    current,
                    graduated,
                    legacy: data.legacy
                })
            } catch (e) {
                setError("Oops! There's been a problem fetching our cohorts, please try again later!")
                console.error(e);
            }
        }

        fetchCohorts()
    }, [])

    return (
        <article id="cohorts">
            { error && <h2 className="error">{error}</h2> }

            { cohorts && (
                <>
                <section id="graduated">
                    <h2>Graduated</h2>
                    { cohorts.graduated.map(c => <Link to={`/${c.name}`} className="name">{c.name}</Link>) } 
                    { cohorts.legacy.map(c => <p className="name">{c.name}</p>) }    
                </section>
                
                <section id="current">
                    <h2>Current</h2>
                    { cohorts.current.map(c => <Link to={`/${c.name}`} className="name">{c.name}</Link>) }
                </section>
                </>
            )}

        </article>
    )
}
