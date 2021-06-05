import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

import './style.css'

export default function CohortsIndex() {
    const [ error, setError ] = useState()
    const [ cohorts, setCohorts ] = useState()

    useEffect(() => {
        async function fetchCohorts(){
            try {
                const { data } = await axios.get('https://raw.githubusercontent.com/getfutureproof-admin/cohorts/main/db.json')
                let cohorts = data.cohorts.sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
                setCohorts( cohorts )
            } catch (e) {
                setError("Oops! There's been a problem fetching our cohorts, please try again later!")
                console.error(e);
            }
        }

        fetchCohorts()
    }, [])

    const formatEndDate = (startDate) => {
        let endDate = dayjs(startDate).add(13, 'weeks')
        let formatted = endDate.format("MMMM Do YYYY")
        formatted = endDate.isAfter(dayjs()) ? 
                        `Graduating ${endDate.fromNow()} on ${formatted}`
                        : `Graduated on\n${formatted}`
        return formatted
    }

    return (
        <article id="cohorts">
            { error && <h2 className="error">{error}</h2> }

            { cohorts && (
                <>
                    { cohorts.map(c => (
                        <Link to={`/${c.name}`}>
                            <div className="cohort-preview">
                                <span className="name">{c.name}</span>
                                <span className="date">{formatEndDate(c.startDate)}</span>
                            </div>
                        </Link>
                    )) }
                </>
            )}

        </article>
    )
}
