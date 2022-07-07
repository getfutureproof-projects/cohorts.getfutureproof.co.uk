import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCohort } from '../../contexts/cohort';
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

import { Card } from '@getfutureproof/fpsb';

export default function CohortsIndex() {
    let { list, error } = useCohort();
    const navigate = useNavigate();

    const formatEndDate = cohort => {
        let formatted = cohort.endDate.format("MMMM Do YYYY")
        formatted = cohort.status === 'graduated' ? 
                        `Graduated on\n${formatted}`
                        : `Graduating ${cohort.endDate.fromNow()} on ${formatted}`
        return formatted
    }

    return (
        <>
            { error && <h2 className="error">{error}</h2> }

            { list && (
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
            )}

        </>
    )
}


        // <Link to={`/${c.name}`} key={c.name}>
                        //     <div className="cohort-preview" style={{backgroundColor: colors.purple}}>
                        //         <span className="name">{c.name}</span>
                        //         <span className="date italic">{formatEndDate(c)}</span>
                        //     </div>
                        // </Link>
