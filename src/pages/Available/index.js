import React, { useEffect } from 'react'
import { useCohort } from '../../contexts/cohort'
import { BackBtn, Headshot } from '../../components'
import SEO from '../SEO'

export function Available() {
    const { loading, error, available, loadAvailable, list } = useCohort()

    useEffect(() => {
        loadAvailable()
    }, [list])

    const renderHeadshots = () => available.map((s, i) => <Headshot key={i} person={s}/>)

    return (
        <>
        <SEO topic="available"/>
        <article id="headshots">
            { loading && <h2>Finding futureproofers available for interview...</h2> }
            { error && <h2><BackBtn path="/" /> {error}</h2> }
            { available && (
                // <section id="container" style={styles}>
                <section id="container">
                    <>
                    <div id="summary_container">
                        <h2><BackBtn path="/" />
                                Hello! We are ready to interview now!                
                        </h2>
                        <p id="cohort-summary">
                            Click on our picture to find out more about us.
                        </p>
                    </div>
                    { renderHeadshots() }
                    </>
                </section>
            ) }
        </article>
        </>
    )
}
