import React from 'react'
import { Link } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

import './style.css'

export default function CohortsIndex() {
    let { list, error } = useCohort();

    const formatEndDate = cohort => {
        let formatted = cohort.endDate.format("MMMM Do YYYY")
        formatted = cohort.status === 'current' ? 
                        `Graduating ${cohort.endDate.fromNow()} on ${formatted}`
                        : `Graduated on\n${formatted}`
        return formatted
    }

    return (
        <article id="cohorts">
            { error && <h2 className="error">{error}</h2> }

            { list && (
                <>
                    { list.map(c => (
                        <Link to={`/${c.name}`} key={c.name}>
                            <div className="cohort-preview">
                                <span className="name">{c.name}</span>
                                <span className="date">{formatEndDate(c)}</span>
                            </div>
                        </Link>
                    )) }
                </>
            )}

        </article>
    )
}
