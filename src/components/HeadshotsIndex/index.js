import React from 'react'
import { useCohort } from '../../contexts/cohort'
import { Headshot } from '../'

export default function HeadshotsIndex() {
    const cohort = useCohort()

    const renderHeadshots = cohort.current.students.map((s, i) => <Headshot key={i} person={s}/>)

    return (
        <>
            { renderHeadshots }
        </>
    )
}
